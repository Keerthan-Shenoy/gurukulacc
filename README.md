# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## Getting Your Code into a Git Repository

Follow these steps to save your project to a service like GitHub, GitLab, or Bitbucket. This will allow you to download the code to your computer and collaborate with others.

### Step 1: Open a Terminal

First, you need to open a command-line terminal. In most cloud development environments, you can find an option in the "Terminal" or "View" menu at the top of the screen to open a new terminal.

### Step 2: Initialize a Git Repository

In your terminal, run the following command. This creates a new Git repository in your project directory.

```bash
git init -b main
```

### Step 3: Create a GitHub Repository

Go to [GitHub](https://github.com/new) and create a new, empty repository. **Do not** initialize it with a README, .gitignore, or license file, as we already have those.

After creating the repository, GitHub will show you a URL for it. It will look something like this: `https://github.com/your-username/your-repo-name.git`. Copy this URL.

### Step 4: Connect Your Project to the GitHub Repository

Back in your terminal, run the following command. Replace `<your-repo-url>` with the URL you just copied from GitHub.

```bash
git remote add origin <your-repo-url>
```

For example:
`git remote add origin https://github.com/your-username/your-repo-name.git`

### Step 5: Add, Commit, and Push Your Files

Now, run these commands one by one to save your files to Git and upload them to GitHub.

```bash
# Stage all your files for the first commit
git add .

# Save the files with a commit message
git commit -m "Initial commit from Firebase Studio"

# Push your committed files to GitHub
git push -u origin main
```

### All Done!

That's it! All of your project files are now safely stored in your GitHub repository. You can now `git clone` this repository to your local machine or share it with others.
