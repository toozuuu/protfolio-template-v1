import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  loading: boolean;
  error: boolean;
}

export interface GitHubRepo {
  owner: string;
  repo: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, { data: GitHubRepoStats; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

  /**
   * Fetch repository stats from GitHub API
   * Uses caching to avoid rate limits
   */
  async getRepoStats(owner: string, repo: string): Promise<GitHubRepoStats> {
    const cacheKey = `${owner}/${repo}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    // Return loading state
    const loadingState: GitHubRepoStats = {
      stars: 0,
      forks: 0,
      loading: true,
      error: false,
    };

    // Only fetch in browser
    if (!isPlatformBrowser(this.platformId)) {
      return loadingState;
    }

    try {
      // Use GitHub API (no authentication needed for public repos)
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const stats: GitHubRepoStats = {
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
        loading: false,
        error: false,
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: stats,
        timestamp: Date.now(),
      });

      return stats;
    } catch (error) {
      // Return error state
      const errorState: GitHubRepoStats = {
        stars: 0,
        forks: 0,
        loading: false,
        error: true,
      };

      // Cache error for shorter duration (1 minute)
      this.cache.set(cacheKey, {
        data: errorState,
        timestamp: Date.now() - (this.CACHE_DURATION - 60 * 1000),
      });

      return errorState;
    }
  }

  /**
   * Fetch stats for multiple repositories
   */
  async getMultipleRepoStats(repos: GitHubRepo[]): Promise<Map<string, GitHubRepoStats>> {
    const statsMap = new Map<string, GitHubRepoStats>();

    // Fetch all repos in parallel (but with rate limiting consideration)
    const promises = repos.map(async (repo) => {
      const stats = await this.getRepoStats(repo.owner, repo.repo);
      statsMap.set(repo.id, stats);
    });

    await Promise.all(promises);
    return statsMap;
  }

  /**
   * Clear cache for a specific repository
   */
  clearCache(owner: string, repo: string): void {
    const cacheKey = `${owner}/${repo}`;
    this.cache.delete(cacheKey);
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.cache.clear();
  }
}
