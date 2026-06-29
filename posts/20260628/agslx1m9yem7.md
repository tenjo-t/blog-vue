---
title: ブログ更新（内部ルーティング）
tag: IT
---

VitePress風の自作SSGを使用しており、ファイルシステムベースのルーティングを採用している。新たに、Markdownのディレクトリ構造と生成ページのマッピングをカスタマイズできるようにした。

VitePressにあるものと同じようなものだが、ルーティングに影響させずにMarkdownファイルを例えば日付やカテゴリで整理するのに役立った。

```txt
/posts/20260601/post1.md → /posts/post1.md
/posts/20260602/post2.md → /posts/post2.md
/posts/20260603/post3.md → /posts/post3.md
/posts/20260604/post4.md → /posts/post4.md
```

書いているときに思ったが、これだけならばNext.jsの[Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)でも良かったかも。今回はパスを好き勝手に書き換えられるのでより自由度は高いのだが。

---

## おまけ

Windowsでの開発中にNode.jsをNVMからMiseへ移行してみたが、VSCode周りでうまくいかなかった。Miseではshimsにパスを通す必要があるが、パスを通してVSCodeを起動するとPCが激重になった。shimsの挙動がとても怪しいが深追いはせずにNVMに戻ることにした。
