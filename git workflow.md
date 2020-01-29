# Git Workflow

http://www.ruanyifeng.com/blog/2015/12/git-workflow.html

## 功能驱动

功能驱动式开发（Feature-Driven development）FDD

需求 -> 功能分支/补丁分支 -> 合并到主分支



## Git Flow

* 长期分支

  * 主分支 master
  * 开发分支 develop

* 短期分支

  * 功能分支 feature
  * 补丁分支 hotfix
  * 预发分支 release

  短期分支一旦开发完成，就会被合并进`develop`或`master`，然后被删除

  

## Github Flow

* 长期分支
  * 主分支 master

* 工作流程

  * 根据需求，从`master`拉出新分支
  * 新分支开发完成后，向`master`发起Pull Request请求
  * Pull Request既是一个通知，让别人注意到你的请求，又是一种对话机制，大家一起评审和讨论你的代码。对话过程中，你还可以不断提交代码。
  * Pull Request被接受，合并进`master`，原分支被删除

  