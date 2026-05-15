export type BlockType = "description" | "code" | "note" | "warning" | "tip";

export interface Block {
  type: BlockType;
  content: string;
}

export interface GuideStep {
  title: string;
  blocks: Block[];
}

export interface GuideSection {
  id: string;
  label: string;
  badge?: string;
  description?: string;
  steps: GuideStep[];
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "beginner" | "intermediate";
  estimatedTime: string;
  prerequisites: string[];
  sections: GuideSection[];
}

export const guides: Guide[] = [
  // ─────────────────────────────────────────────────────────────
  // Guide 1 — Deploy a New Repository
  // ─────────────────────────────────────────────────────────────
  {
    slug: "new-repo-deployment",
    title: "Deploy a New Repository from the CLI",
    subtitle: "Push a local project to GitHub using only terminal commands",
    description:
      "A complete walkthrough for taking a local project folder and publishing it to a brand-new GitHub repository — no browser required after the initial repo creation.",
    difficulty: "beginner",
    estimatedTime: "10 minutes",
    prerequisites: [
      "Git installed on your machine (git --version to verify)",
      "A GitHub account",
      "A Personal Access Token from GitHub (Settings → Developer Settings → Personal Access Tokens) or an SSH key already configured",
    ],
    sections: [
      {
        id: "prepare",
        label: "Step 1 — Prepare Your Local Project",
        steps: [
          {
            title: "Navigate to your project folder",
            blocks: [
              {
                type: "description",
                content:
                  "Open your terminal and change into the directory that holds your project files. If the folder does not exist yet, create it first.",
              },
              {
                type: "code",
                content: "cd /path/to/your-project",
              },
              {
                type: "tip",
                content:
                  "If starting fresh: run mkdir my-project && cd my-project to create and enter a new folder in one step.",
              },
            ],
          },
          {
            title: "Initialize a Git repository",
            blocks: [
              {
                type: "description",
                content:
                  "This creates a hidden .git folder inside your project that Git uses to track all changes, branches, and history from this point forward.",
              },
              {
                type: "code",
                content: "git init",
              },
            ],
          },
          {
            title: "Set the default branch name to main",
            blocks: [
              {
                type: "description",
                content:
                  "Older versions of Git default to 'master'. Running this command renames the initial branch to 'main' to match GitHub's current convention and avoid confusion.",
              },
              {
                type: "code",
                content: "git branch -M main",
              },
            ],
          },
          {
            title: "Stage all project files",
            blocks: [
              {
                type: "description",
                content:
                  "Staging tells Git which files to include in the next commit. The dot (.) stages everything in the current directory.",
              },
              {
                type: "code",
                content: "git add .",
              },
              {
                type: "tip",
                content:
                  "Run git status before staging to review exactly which files will be included. Avoid staging .env files, credentials, or large binary assets.",
              },
            ],
          },
          {
            title: "Create your first commit",
            blocks: [
              {
                type: "description",
                content:
                  "A commit permanently records the staged snapshot in your local history. Every subsequent push sends these commits to the remote.",
              },
              {
                type: "code",
                content: 'git commit -m "Initial commit"',
              },
            ],
          },
        ],
      },
      {
        id: "create-remote",
        label: "Step 2 — Create the Remote Repository on GitHub",
        steps: [
          {
            title: "Create a new empty repository on GitHub",
            blocks: [
              {
                type: "description",
                content:
                  "Go to github.com/new, give your repository a name, and click Create Repository. Leave all checkboxes unchecked.",
              },
              {
                type: "warning",
                content:
                  "Do NOT check Add a README, .gitignore, or License. If GitHub adds any file to the new repo, your local history and the remote will diverge immediately, causing a rejected push. Start with a completely empty repository.",
              },
              {
                type: "description",
                content:
                  "After creating the repo, GitHub shows you a Quick Setup page with your repository URL. Copy it — it will look like: https://github.com/your-username/your-repo.git",
              },
            ],
          },
        ],
      },
      {
        id: "connect-push",
        label: "Step 3 — Connect and Push",
        steps: [
          {
            title: "Link your local repository to GitHub",
            blocks: [
              {
                type: "description",
                content:
                  "Register the GitHub URL as a remote named 'origin'. This is the destination Git will push to and pull from.",
              },
              {
                type: "code",
                content:
                  "git remote add origin https://github.com/your-username/your-repo.git",
              },
            ],
          },
          {
            title: "Push your local branch to GitHub",
            blocks: [
              {
                type: "description",
                content:
                  "The -u flag sets origin/main as the default upstream for this branch. After this first push, all future pushes from this branch only require git push.",
              },
              {
                type: "code",
                content: "git push -u origin main",
              },
            ],
          },
          {
            title: "Verify the connection and confirm the push",
            blocks: [
              {
                type: "code",
                content: "git remote -v\ngit log --oneline",
              },
              {
                type: "note",
                content:
                  "git remote -v lists your configured remotes and their URLs. git log --oneline shows the commit that was just pushed. You can also visit your repository URL in a browser to confirm the files are live.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Guide 2 — Sync Before You Push
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sync-before-push",
    title: "Sync Remote Changes Before Committing",
    subtitle:
      "The safe workflow when both your local branch and the remote have new changes",
    description:
      "When a collaborator has pushed new commits to the remote while you were working locally, a direct push will be rejected. This guide walks through two battle-tested approaches to safely merge both sets of changes and push without overwriting anyone's work.",
    difficulty: "beginner",
    estimatedTime: "15 minutes",
    prerequisites: [
      "An existing local Git repository with a configured remote (git remote -v to check)",
      "Uncommitted or committed local changes you want to push",
      "The remote branch has newer commits that you have not pulled yet",
    ],
    sections: [
      {
        id: "understand",
        label: "Understanding the Situation",
        steps: [
          {
            title: "Why this happens",
            blocks: [
              {
                type: "description",
                content:
                  "Git's push operation requires that your local branch includes all commits that already exist on the remote. If a teammate pushed while you were working, your local branch is now behind the remote. Git rejects the push to protect against overwriting their work.",
              },
              {
                type: "description",
                content:
                  "The solution is always the same: bring the remote changes down first, reconcile them with your local changes, then push the combined result.",
              },
              {
                type: "tip",
                content:
                  "Always check your status before starting work each day: run git fetch origin && git status to see if the remote has moved ahead of you.",
              },
            ],
          },
        ],
      },
      {
        id: "approach-a",
        label: "Approach A — Stash, Pull, then Commit",
        badge: "Best for uncommitted work",
        description:
          "Use this approach when your local changes are not yet ready to commit — you want to pull the remote updates first, then finish and commit your work on top.",
        steps: [
          {
            title: "Check your current state",
            blocks: [
              {
                type: "description",
                content:
                  "Get a clear picture before touching anything. git status shows modified files. git log confirms where your local branch stands relative to the remote.",
              },
              {
                type: "code",
                content: "git status\ngit log --oneline -5",
              },
            ],
          },
          {
            title: "Stash your uncommitted changes",
            blocks: [
              {
                type: "description",
                content:
                  "Stashing saves your work-in-progress to a temporary shelf and leaves your working directory clean — exactly what git pull needs to run without conflict.",
              },
              {
                type: "code",
                content: 'git stash push -m "WIP: description of your changes"',
              },
              {
                type: "note",
                content:
                  "The label (-m) is optional but strongly recommended. When you have multiple stashes, a clear description tells you which one to restore.",
              },
            ],
          },
          {
            title: "Pull the latest changes from the remote",
            blocks: [
              {
                type: "description",
                content:
                  "With a clean working directory, the pull will succeed cleanly. Your local branch now matches the remote.",
              },
              {
                type: "code",
                content: "git pull origin main",
              },
            ],
          },
          {
            title: "Restore your stashed changes",
            blocks: [
              {
                type: "description",
                content:
                  "git stash pop re-applies your work-in-progress on top of the freshly pulled code and removes the stash entry.",
              },
              {
                type: "code",
                content: "git stash pop",
              },
              {
                type: "warning",
                content:
                  "If the stash pop causes a conflict (both you and a teammate changed the same file), Git will pause and mark the conflicting lines. Continue to the next step to resolve them.",
              },
            ],
          },
          {
            title: "Resolve conflicts (only if stash pop flagged them)",
            blocks: [
              {
                type: "description",
                content:
                  "Open each conflicting file. Git marks conflicts with these three sections: <<<<<<< Updated upstream (the remote version), ======= (separator), >>>>>>> Stashed changes (your version). Edit the file to keep the correct content, then delete all three marker lines.",
              },
              {
                type: "code",
                content:
                  "# After editing each conflicted file, stage it\ngit add filename.js\n\n# Repeat for every conflicted file, then verify\ngit status",
              },
            ],
          },
          {
            title: "Stage all your changes",
            blocks: [
              {
                type: "code",
                content: "git add .",
              },
            ],
          },
          {
            title: "Commit your changes",
            blocks: [
              {
                type: "code",
                content:
                  'git commit -m "Your clear description of what you added or changed"',
              },
            ],
          },
          {
            title: "Push to the remote",
            blocks: [
              {
                type: "description",
                content:
                  "Your branch now contains both the remote's commits and your own. The push will succeed.",
              },
              {
                type: "code",
                content: "git push origin main",
              },
            ],
          },
        ],
      },
      {
        id: "approach-b",
        label: "Approach B — Commit, Rebase, then Push",
        badge: "Recommended for clean history",
        description:
          "Use this approach when your changes are ready to commit. Pull with --rebase replays your commit on top of the remote history, producing a clean, linear timeline with no merge commits.",
        steps: [
          {
            title: "Check your current state",
            blocks: [
              {
                type: "code",
                content: "git status",
              },
            ],
          },
          {
            title: "Stage your changes",
            blocks: [
              {
                type: "code",
                content: "git add .",
              },
              {
                type: "tip",
                content:
                  "Stage specific files (git add src/feature.js) instead of everything when you only want to commit part of your changes.",
              },
            ],
          },
          {
            title: "Commit your changes locally",
            blocks: [
              {
                type: "description",
                content:
                  "This records your changes as a local commit. Nothing is pushed yet — you are just creating a checkpoint that rebase will work with.",
              },
              {
                type: "code",
                content: 'git commit -m "Your descriptive commit message"',
              },
            ],
          },
          {
            title: "Pull with rebase",
            blocks: [
              {
                type: "description",
                content:
                  "This is the key step. --rebase fetches the remote commits, temporarily removes your local commit, applies the remote commits first, then re-applies your commit on top — as if you had started your work after the remote changes already existed.",
              },
              {
                type: "code",
                content: "git pull --rebase origin main",
              },
              {
                type: "warning",
                content:
                  "If Git reports conflicts during the rebase, it will pause. Continue to the next step to resolve them before proceeding.",
              },
            ],
          },
          {
            title: "Resolve rebase conflicts (if any)",
            blocks: [
              {
                type: "description",
                content:
                  "Edit each conflicting file to keep the correct content and remove all conflict markers. Then stage the file and tell Git to continue the rebase.",
              },
              {
                type: "code",
                content:
                  "# Edit the conflicted file, then stage it\ngit add filename.js\n\n# Continue replaying the remaining commits\ngit rebase --continue",
              },
              {
                type: "note",
                content:
                  "If you want to cancel the rebase entirely and return to your committed state before the pull: git rebase --abort",
              },
            ],
          },
          {
            title: "Push to the remote",
            blocks: [
              {
                type: "description",
                content:
                  "Your commit now sits on top of the remote's commits with a clean, linear history. The push will succeed without a merge commit.",
              },
              {
                type: "code",
                content: "git push origin main",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
