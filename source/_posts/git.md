#### git commit 提交到本地仓库，出错怎么办
1. 提交信息出错
更改 commit 信息
```
git commit --amend -m“新提交消息”
```
2. 漏提交
+ 方案一：再次 commit
```
git commit -m“提交消息”
```
+ 方案二：遗漏文件提交到之前 commit 上
```
git add missed-file // missed-file 为遗漏提交文件
git commit --amend --no-edit
```
--no-edit 表示提交消息不会更改，在 git 上仅为一次提交

3. 提交错误文件，回退到上一个 commit 版本，再 commit
+ git reset: 删除指定的commit
```
// 修改版本库，保留暂存区，保留工作区
// 将版本库软回退1个版本，软回退表示将本地版本库的头指针全部重置到指定版本，且将这次提交之后的所有变更都移动到暂存区。
git reset --soft HEAD~1

// 修改版本库，修改暂存区，修改工作区
//将版本库回退1个版本，不仅仅是将本地版本库的头指针全部重置到指定版本，也会重置暂存区，并且会将工作区代码也回退到这个版本
git reset --hard HEAD~1
// git版本回退，回退到特定的commit_id版本，可以通过git log查看提交历史，以便确定要回退到哪个版本(commit 之后的即为ID);
git reset --hard commit_id 
```
+ git revert:撤销 某次操作，此次操作之前和之后的commit和history都会保留，并且把这次撤销
```
// 撤销前一次 commit
git revert HEAD
// 撤销前前一次 commit
git revert HEAD^
// (比如：fa042ce57ebbe5bb9c8db709f719cec2c58ee7ff）撤销指定的版本，撤销也会作为一次提交进行保存。
git revert commit
```