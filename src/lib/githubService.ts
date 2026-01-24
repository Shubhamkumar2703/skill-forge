/**
 * GitHub Service
 * Fetch user's commits, repositories, and contribution data
 */

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  url: string;
}

interface GitHubProofData {
  username: string;
  totalCommits: number;
  publicRepos: number;
  repositories: GitHubRepo[];
  recentCommits: GitHubCommit[];
  followerCount: number;
  verifiedAt: string;
}

/**
 * Fetch GitHub user profile data
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub user fetch failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('GitHub user fetch error:', error);
    throw error;
  }
}

/**
 * Fetch user's public repositories
 */
export async function fetchUserRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?type=public&sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub repos fetch failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('GitHub repos fetch error:', error);
    throw error;
  }
}

/**
 * Fetch user's recent commits across all public repos
 */
export async function fetchUserCommits(
  username: string,
  limit: number = 30
): Promise<GitHubCommit[]> {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    // Fetch user's repos first
    const repos = await fetchUserRepositories(username);
    const commits: GitHubCommit[] = [];

    // Fetch commits from each repo
    for (const repo of repos.slice(0, 10)) {
      // Limit to top 10 repos for performance
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${repo.full_name}/commits?author=${username}&per_page=10`,
        { headers }
      );

      if (response.ok) {
        const repoCommits = await response.json();
        commits.push(...repoCommits);
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return commits.slice(0, limit);
  } catch (error) {
    console.error('GitHub commits fetch error:', error);
    throw error;
  }
}

/**
 * Count total commits across all public repos
 */
export async function countTotalCommits(username: string): Promise<number> {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    const repos = await fetchUserRepositories(username);
    let totalCommits = 0;

    for (const repo of repos) {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${repo.full_name}/commits?author=${username}&per_page=1`,
        { headers }
      );

      if (response.ok) {
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
          const lastMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (lastMatch) {
            totalCommits += parseInt(lastMatch[1], 10);
          }
        } else {
          const commits = await response.json();
          totalCommits += commits.length;
        }
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return totalCommits;
  } catch (error) {
    console.error('Total commits count error:', error);
    return 0;
  }
}

/**
 * Get programming languages used by the user
 */
export async function fetchUserLanguages(username: string): Promise<string[]> {
  try {
    const repos = await fetchUserRepositories(username);
    const languages = new Set<string>();

    repos.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });

    return Array.from(languages);
  } catch (error) {
    console.error('GitHub languages fetch error:', error);
    return [];
  }
}

/**
 * Generate comprehensive GitHub proof data
 */
export async function generateGitHubProof(username: string): Promise<GitHubProofData> {
  try {
    const [user, repos, commits, totalCommits] = await Promise.all([
      fetchGitHubUser(username),
      fetchUserRepositories(username),
      fetchUserCommits(username, 20),
      countTotalCommits(username),
    ]);

    return {
      username: user.login,
      totalCommits: totalCommits || commits.length,
      publicRepos: user.public_repos,
      repositories: repos.slice(0, 10), // Top 10 repos
      recentCommits: commits,
      followerCount: user.followers,
      verifiedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('GitHub proof generation error:', error);
    throw error;
  }
}

/**
 * Verify if a GitHub user exists
 */
export async function verifyGitHubUser(username: string): Promise<boolean> {
  try {
    const user = await fetchGitHubUser(username);
    return !!user.login;
  } catch {
    return false;
  }
}

/**
 * Get user's primary programming languages (top 3)
 */
export async function getUserPrimaryLanguages(username: string): Promise<string[]> {
  try {
    const repos = await fetchUserRepositories(username);
    const languageCount: { [key: string]: number } = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    return Object.entries(languageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);
  } catch (error) {
    console.error('Primary languages fetch error:', error);
    return [];
  }
}
