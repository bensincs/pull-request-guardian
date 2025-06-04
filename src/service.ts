import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';

class GithubService {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private pr_number: number;

  constructor(token: string, owner: string, repo: string, pr_number: number) {
    this.octokit = new Octokit({ auth: token, request: { fetch } });
    this.owner = owner;
    this.repo = repo;
    this.pr_number = pr_number;
  }

  async commentOnPR(message: string): Promise<void> {
    await this.octokit.issues.createComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: this.pr_number,
      body: message,
    });
  }
}

export default GithubService;
