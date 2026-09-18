---
title: Microsoft Word to GitHub Wiki workflow with Writage
slug: word-github-wiki-writage
sidebar_position: 9
id: word-github-wiki-writage
description: A step-by-step guide to writing, editing, and publishing GitHub wiki pages directly from Microsoft Word using Writage and GitHub Desktop.
---

## Introduction

This guide explains how to write and edit GitHub wiki pages directly in Microsoft Word using the Writage add-in.

This workflow benefits writers who prefer Word's familiar interface and features while using GitHub for version control and collaboration.

Writage is a Markdown editor add-in for Microsoft Word. It allows users to write and edit Markdown documents directly within Word, making it easier to create and format content for GitHub wikis.

A Markdown document pushed to the wiki repository appears as a new page on the wiki.

## Prerequisites

- [The Writage add-in for Microsoft Word](https://www.writage.com/)
  
  :::note    
  Writage includes a 14-day free trial. Afterward, you must purchase a license.
  :::
- [An up-to-date installation of Microsoft Word](https://www.microsoft.com/en-us/microsoft-365/download-office)
- [An up-to-date installation of GitHub Desktop](https://desktop.github.com/download/)
- An existing GitHub repository with an initialized wiki

## Instructions

### Setting up Writage

1. Follow the installation prompts to set up the Writage add-in.

<div className="doc-img-container" style={{maxWidth: '420px'}}>

[![A graphic showing the Writage installation process](./media/03702a00abd3b4f99eac060250660755.png)](./media/03702a00abd3b4f99eac060250660755.png "Click to view full resolution")

</div>

### Writage in Microsoft Word

Once you install the Writage add-in, you can write and edit a Markdown document like a regular Word document. With Writage, you can open existing Markdown files directly in Word, and save Word documents as Markdown files.

<div className="doc-img-container" style={{maxWidth: '100%'}}>

[![A graphic showing the Writage interface in Microsoft Word](./media/a4801fe46abc5fe89b6e2fde34fae4ff.png)](./media/a4801fe46abc5fe89b6e2fde34fae4ff.png "Click to view full resolution")

</div>

### Cloning a GitHub wiki to GitHub Desktop

GitHub Desktop doesn't automatically clone a repository's wiki. You must clone the wiki repository manually.

1. Open the wiki on GitHub and copy the clone URL from the lower-right corner of the page.

   <div className="doc-img-container" style={{maxWidth: '720px'}}>

   [![A screenshot of this wiki's homepage](./media/image-1.png)](./media/image-1.png "Click to view full resolution")

   </div>

2. In GitHub Desktop, press **Ctrl**+**Shift**+**O** to open the **Clone a repository** dialog.
3. Click the **URL** tab.
4. Paste the wiki URL, then click **Clone**.

   <div className="doc-img-container" style={{maxWidth: '480px'}}>

   [![A screenshot of a cloning dialog in GitHub Desktop](./media/d122bfeed3d1e921e4c42291d537a828.png)](./media/d122bfeed3d1e921e4c42291d537a828.png "Click to view full resolution")

   </div>

### Pushing a Markdown document to a GitHub wiki

After writing a Markdown document in Word, you can push it directly to your GitHub wiki repository. This eliminates the need to copy, paste, and format content in GitHub's web editor.

1. Save the Markdown document into the local directory where you cloned the wiki repository.
2. Open the GitHub Desktop app.
3. Select the wiki repository.
4. Enter a concise commit summary, then click **Commit to main** or **Commit to master**.

   :::note
   The summary describes the document updates, helping other contributors understand revisions without reading the entire file.
   :::

   <div className="doc-img-container" style={{maxWidth: '240px'}}>

   [![A screenshot of the commit dialog in GitHub Desktop](./media/caffdbb3233d43fbc83f51e5f63d99c9.png)](./media/caffdbb3233d43fbc83f51e5f63d99c9.png "Click to view full resolution")

   </div>

5. Press **Ctrl**+**P** or click **Push origin** to push the changes to the wiki.
6. Open the wiki in a web browser to verify the published page.

Repeat these steps whenever you create a new document or edit an existing wiki page.

### Converting a Markdown document into a PDF file

1. Open the Markdown document in Word.
2. Click **File** > **Save As**.
3. Select **PDF** in the file format dropdown menu.
4. Choose a destination folder, then click **Save**.
