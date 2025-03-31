---
title: Create a Website with Github Pages
date:
  created: 2020-05-06
---

# Create a Website with Github Pages

![](../../assets/images/material-mkdocs.png)

If you have a project, blog, or documentation that you need to have hosted in a site, [Github Pages](https://pages.github.com/) can be a great way to host your site for free straight from the repository. 

<!-- more -->

Since this website itself was made with [Material MkDocs](https://github.com/squidfunk/mkdocs-material), this tutorial will explain how to build and deploy a static website to Github Pages using that. 

## Install Python 

MkDocs is built using Python, so we will need to install Python first in order to build and run anything. Since Macs by default have Python 2 installed, we will need to install Python 3 to use MkDocs. The easiest way to install Python 3 is with [Homebrew](https://brew.sh/). 

```bash
brew install python
```

Once installed, you should be able to verify this by running the following command to see the version number. 

```bash
$ python3 -V
Python 3.7.7
```

If you wish to use the `python` command in the terminal and have it reference the `python3` version. Following this [article](https://opensource.com/article/19/5/python-3-default-mac), we can create an alias in your bash profile that will reference the `python3` version. First get the path of where `python3` was installed. 

```bash
$ which python3
/usr/local/bin/python3
```

Now add an alias to your bash profile file that will now make any `python` command in the terminal point to the `python3` version instead of Mac default of `python2`. 

```bash
alias python=/usr/local/bin/python3
```

After sourcing your bash profile with the new alias, you should now be able to just use `python` in the terminal instead `python3`. 

## Download and Install Material MkDocs

### Using Github

The easiest way to get running is to fork the repository from Github and then clone that repository to your machine. 

![Fork Github Repository](../../assets/images/fork-repository.png)

Now in order to access your website in the public space in the end, we must rename the repository to `<username>.github.io` in order to work with the default domain given for free from Github Pages. Go to the settings of your repository, and rename the repo with your username replaced. 

![Rename Forked Repository](../../assets/images/rename-repo.png)

Now we can clone the repository to our local machine with git. 

!!! note
    I am using the the SSH urls when cloning, you could just as easily use the https urls. If you have not set that up in git and wish to learn how, checkout [how to use SSH](/2018-07-20-ssh.md).

    `git clone https://github.com/squidfunk/mkdocs-material.git`

```bash
git clone git@github.com:plusmobileapps/plusmobileapps.github.io.git
```

### Enterprise Github

In case you are working with an enterprise instance of Github that has a different domain and is not publicly accessible without some form of authentication. Then just go ahead and clone the Material MkDocs repository directly and add your enterprise's remote url. 

```bash 
git clone git@github.com:squidfunk/mkdocs-material.git
git remote add enterprise https://enterprise.repo.forforking.com/user/repo.git
git push enterprise master
```

## Running Material MkDocs Locally

First install all of the Material MkDocs dependencies with Python's package manager, `pip`. 

```bash 
pip install mkdocs-material
```

Then to run the server, you can run the following command on the `mkdocs` python module. 

```bash
python -m mkdocs serve
```

Open up your browser and navigate to `http://127.0.0.1:8000/` and you should now see the landing page for your Material MkDocs site. 

![Material MkDocs](../../assets/images/mkdocs-home.png)

!!! note
    If you run into an error when running the command above with the following

    ```bash 
    MkDocs encountered as error parsing the configuration file: while constructing a Python object
    cannot find module 'materialx.emoji' (No module named 'materialx')
    ```

    Then comment out the following lines in the `mkdocs.yml` file since you probably don't need the emoji dependency right away. 

    ```yml
    # - pymdownx.emoji:
    #     emoji_index: !!python/name:materialx.emoji.twemoji
    #     emoji_generator: !!python/name:materialx.emoji.to_svg
    ```

## Deploying Your Site To Github Pages

### Deploying to Github

To access your site publicly from any broswer, we can now deploy it with the following command. 

```bash
python -m mkdocs gh-deploy
```

Be sure that the repository settings is configured for Github Pages to be built off of the `gh-pages` branch as this is the default branch MkDocs will deploy to. 

![](../../assets/images/gh-pages-branch.png)

If you are creating a personal Github Pages website for your username and do not see the option to switch the branch. This is because it must be built off of master which is an easy fix to deploy to. 

![](../../assets/images/personal-gh-pages.png)

From the master branch, checkout a new branch and call it `develop` then push it to Github. Now you can configure MkDocs to deploy to the `master` branch instead of the default `gh-pages` branch. 

```bash
git checkout -b develop 
git push origin develop
python3 -m mkdocs gh-deploy -b master
```

### Deploying to Github Enterprise

To deploy to your enterprise instance of Github, you must make use of the remote flag to tell MkDocs that it should deploy to the `gh-pages` branch on your remote repository.  


```bash
python -m mkdocs gh-deploy -r myfork
```

The easiest way to figure out your url for you enterprise Github Pages site is to go to the repository's settings, and go down to the Github Pages section to see where it was published. 

![Enterprise Github Pages Name](../../assets/images/enterprise-ghpages-name.png)

## Configure Custom Domain for Github Pages

[Managing Custom Domain - Github Docs](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site)

[Dev.to article](https://dev.to/trentyang/how-to-setup-google-domain-for-github-pages-1p58) for configuring Github Pages with custom domain on Google Domains. 

[Deploying MkDocs CNAME](https://www.mkdocs.org/user-guide/deploying-your-docs/#custom-domains) - adding a [CNAME file](https://github.com/plusmobileapps/plusmobileapps.github.io/blob/develop/docs/CNAME) in the docs folder that contains the domain name that was used in the custom domain field in the repository settings will allow the `mkdocs gh-deploy` command from wiping out the CNAME file in the master branch. 

![](../../assets/images/gh-custom-domain.png)


If you happen to get the following warning when updating the custom domain in your Github repository settings. I found out there was another repository on my account that had the custom domain already setup and deleting that custom domain on the other repository fixed my issue. 

![](../../assets/images/github-pages-error.png)