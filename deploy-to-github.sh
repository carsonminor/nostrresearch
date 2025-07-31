#!/bin/bash

# NostrResearch GitHub Deployment Script
echo "🚀 NostrResearch GitHub Deployment"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're already in a git repository
if [ -d ".git" ]; then
    echo "📁 Git repository already exists."
else
    echo "📁 Initializing Git repository..."
    git init
fi

# Get GitHub username and repository name
read -p "Enter your GitHub username: " github_username
read -p "Enter repository name (default: nostrresearch): " repo_name
repo_name=${repo_name:-nostrresearch}

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: NostrResearch platform"

# Add remote origin
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$github_username/$repo_name.git"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed to GitHub!"
    echo ""
    echo "🌐 Your repository: https://github.com/$github_username/$repo_name"
    echo "📖 Enable GitHub Pages in repository settings"
    echo "🔗 Your site will be available at: https://$github_username.github.io/$repo_name"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://github.com/$github_username/$repo_name/settings/pages"
    echo "2. Set Source to 'GitHub Actions'"
    echo "3. Wait 5-10 minutes for deployment"
    echo "4. Visit your live site!"
else
    echo "❌ Failed to push to GitHub. Please check your credentials and try again."
    echo "💡 Make sure you've created the repository on GitHub first."
fi