export interface TroubleshootingFix {
  label: string;
  code: string;
}

export interface TroubleshootingItem {
  slug: string;
  title: string;
  cause: string;
  description: string;
  fixes: TroubleshootingFix[];
  tags: string[];
}

export const troubleshootingItems: TroubleshootingItem[] = [
  {
    slug: "permission-denied-publickey",
    title: "Permission denied (publickey)",
    cause: "SSH authentication failure",
    description:
      "Git cannot authenticate with the remote server because your SSH key is either missing, not registered with GitHub, or the remote URL is using the SSH protocol when you have not set up SSH keys.",
    fixes: [
      {
        label: "Switch to HTTPS authentication (quickest fix)",
        code: "git remote set-url origin https://github.com/your-org/your-repo.git",
      },
      {
        label: "Generate a new SSH key",
        code: 'ssh-keygen -t ed25519 -C "you@example.com"',
      },
      {
        label: "Copy the public key (then add it to GitHub → Settings → SSH Keys)",
        code: "cat ~/.ssh/id_ed25519.pub",
      },
      {
        label: "Test the SSH connection",
        code: "ssh -T git@github.com",
      },
    ],
    tags: ["ssh", "authentication", "github", "push", "clone"],
  },
  {
    slug: "remote-origin-already-exists",
    title: "fatal: remote origin already exists",
    cause: "Duplicate remote name",
    description:
      "You ran git remote add origin but a remote named 'origin' is already registered in this repository. Git will not silently overwrite it — you need to update the URL of the existing remote instead.",
    fixes: [
      {
        label: "Update the URL of the existing remote",
        code: "git remote set-url origin https://github.com/your-org/your-repo.git",
      },
      {
        label: "Verify the change",
        code: "git remote -v",
      },
    ],
    tags: ["remote", "origin", "setup"],
  },
  {
    slug: "rejected-non-fast-forward",
    title: "rejected — non-fast-forward",
    cause: "Remote has newer commits your local branch does not",
    description:
      "The remote branch has commits that your local copy does not, so Git refuses the push to avoid overwriting someone else's work. You need to integrate those upstream changes first, then push again.",
    fixes: [
      {
        label: "Pull the latest changes, then push",
        code: "git pull origin main\ngit push origin main",
      },
      {
        label: "Pull with rebase for a cleaner history",
        code: "git pull --rebase origin main\ngit push origin main",
      },
    ],
    tags: ["push", "pull", "remote", "sync"],
  },
  {
    slug: "branch-behind-origin",
    title: "Your branch is behind 'origin/main'",
    cause: "Remote has new commits not yet pulled locally",
    description:
      "The remote branch has progressed since your last pull. Your local branch is out of date. You need to fetch and integrate those changes before you can push.",
    fixes: [
      {
        label: "Pull the latest commits",
        code: "git pull origin main",
      },
      {
        label: "Pull with rebase to avoid a merge commit",
        code: "git pull --rebase origin main",
      },
    ],
    tags: ["pull", "sync", "remote", "behind"],
  },
  {
    slug: "branch-ahead-of-origin",
    title: "Your branch is ahead of 'origin/main'",
    cause: "Local commits have not been pushed yet",
    description:
      "You have made commits locally that the remote does not have. This is the normal state after committing before pushing — just push to synchronize.",
    fixes: [
      {
        label: "Push your local commits to the remote",
        code: "git push origin main",
      },
    ],
    tags: ["push", "sync", "remote", "ahead"],
  },
  {
    slug: "merge-conflicts",
    title: "Merge conflicts",
    cause: "Two branches modified the same lines in the same file",
    description:
      "When Git cannot automatically combine changes from two branches because they both edited the same part of a file, it pauses the merge and marks the conflicting sections with conflict markers. You must manually choose which version to keep, then stage and commit the resolution.",
    fixes: [
      {
        label: "Step 1 — identify conflicting files",
        code: "git status",
      },
      {
        label: "Step 2 — after editing conflicts, stage the resolved file",
        code: "git add filename.js",
      },
      {
        label: "Step 3 — complete the merge commit",
        code: 'git commit -m "Resolve merge conflict in filename.js"',
      },
      {
        label: "Abort the merge entirely and go back to before the pull",
        code: "git merge --abort",
      },
    ],
    tags: ["merge", "conflict", "pull", "branch"],
  },
  {
    slug: "committed-to-wrong-branch",
    title: "Accidentally committed to the wrong branch",
    cause: "Commit was made on the wrong branch",
    description:
      "You made a commit on the wrong branch — perhaps main instead of a feature branch. You can move the commit to the correct branch using cherry-pick, then remove it from the wrong branch.",
    fixes: [
      {
        label: "Step 1 — note the commit hash",
        code: "git log --oneline -3",
      },
      {
        label: "Step 2 — switch to the correct branch and copy the commit",
        code: "git checkout correct-branch\ngit cherry-pick <commit-hash>",
      },
      {
        label: "Step 3 — remove the commit from the wrong branch",
        code: "git checkout wrong-branch\ngit reset --hard HEAD~1",
      },
    ],
    tags: ["commit", "branch", "cherry-pick", "reset"],
  },
  {
    slug: "accidentally-staged-file",
    title: "Accidentally staged a file",
    cause: "git add was run on an unintended file",
    description:
      "You ran git add on a file you did not mean to include in the next commit. You can unstage it without losing any of your local edits.",
    fixes: [
      {
        label: "Unstage a file (modern syntax — keeps local changes)",
        code: "git restore --staged filename.js",
      },
      {
        label: "Unstage a file (older syntax)",
        code: "git reset HEAD filename.js",
      },
    ],
    tags: ["staging", "add", "undo"],
  },
  {
    slug: "undo-last-commit",
    title: "Undo the last commit",
    cause: "Last commit needs to be reverted or amended",
    description:
      "You need to undo the most recent commit. How you do it depends on whether you want to keep your changes and whether the commit has already been pushed to the remote.",
    fixes: [
      {
        label: "Uncommit but keep changes staged (soft reset)",
        code: "git reset --soft HEAD~1",
      },
      {
        label: "Uncommit and unstage changes (mixed reset — default)",
        code: "git reset HEAD~1",
      },
      {
        label: "Discard the commit AND all changes permanently (hard reset — destructive)",
        code: "git reset --hard HEAD~1",
      },
      {
        label: "Safe undo for a pushed commit — creates a new reversal commit",
        code: "git revert HEAD",
      },
    ],
    tags: ["commit", "reset", "revert", "undo"],
  },
  {
    slug: "not-a-git-repository",
    title: "fatal: not a git repository",
    cause: "Git commands run outside an initialized repository",
    description:
      "You are running a Git command in a folder that has not been initialized as a repository (no .git directory present). Either initialize a new repo here or navigate to the correct project folder.",
    fixes: [
      {
        label: "Initialize a new repository in the current folder",
        code: "git init",
      },
      {
        label: "Navigate to an existing repository first",
        code: "cd /path/to/your-project",
      },
    ],
    tags: ["init", "setup", "fatal"],
  },
  {
    slug: "credential-auth-error",
    title: "Credential / authentication errors on push",
    cause: "Stored credentials are outdated or the token has expired",
    description:
      "Your saved credentials are no longer valid — a personal access token may have expired or been revoked. You need to clear the cached credentials and re-authenticate.",
    fixes: [
      {
        label: "Clear cached credentials",
        code: "git credential reject",
      },
      {
        label: "Push again — Git will prompt for new credentials",
        code: "git push origin main",
      },
      {
        label: "Windows: open Credential Manager and remove git:https://github.com entries",
        code: "# Control Panel → Credential Manager → Windows Credentials\n# Remove any git:https://github.com entry, then push again",
      },
    ],
    tags: ["authentication", "credentials", "push", "token", "windows"],
  },
  {
    slug: "lf-crlf-line-endings",
    title: "Line ending warning: LF will be replaced by CRLF",
    cause: "Git is auto-converting Unix line endings to Windows line endings",
    description:
      "This is a warning, not an error — your files will work correctly. Git is normalizing line endings between operating systems. To suppress the warning and handle line endings consistently across your team, configure autocrlf.",
    fixes: [
      {
        label: "Windows — convert to CRLF on checkout, normalize to LF on commit",
        code: "git config --global core.autocrlf true",
      },
      {
        label: "Mac/Linux — keep LF, convert CRLF to LF on commit",
        code: "git config --global core.autocrlf input",
      },
    ],
    tags: ["windows", "line-endings", "crlf", "lf", "warning"],
  },
];

export function getTroubleshootingBySlug(slug: string): TroubleshootingItem | undefined {
  return troubleshootingItems.find((t) => t.slug === slug);
}
