---
title: Shell Scripts
date:
  created: 2018-07-30
categories:
  - Productivity
  - Bash
---

# Why Shell Script? 

If you find yourself running a bunch of bash commands that you would like to version control and share with others, shell script is what you are looking for. 

<!-- more -->

## What is a Shell Script?

Shell scripts are an executable file that contain bash commands to *execute*. The file extension of shell scripts are `.sh` and are ran by putting a `./` in front of the file name. Putting this all together in an example: 


## Creating a Shell Script Example 

Create a file and open it in your favorite editor. 

```bash
touch dosomething.sh
code dosomething.sh
```

Add some bash commands to the file. 

```bash
# dosomething.sh
echo Hello World!
echo "Second line in bash command" 
```

Now before you can run the bash file, touching files does not give executable permissions by default. So we need to make it executable by changing the permissions with the `chmod` command. 

```bash 
chmod +x dosomething.sh
```

Finally you can run the shell script!

```bash
./dosomething.sh
```

### Resources

[About shell scripts in Terminal on Mac - Apple Docs](https://support.apple.com/guide/terminal/about-shell-scripts-apd53500956-7c5b-496b-a362-2845f2aab4bc/mac)