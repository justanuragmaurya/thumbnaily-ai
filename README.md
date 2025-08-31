<h1 align="center">Turborepo starter</h1>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

![GSSoC'25](https://img.shields.io/badge/GSSoC'25-Selected-orange?style=for-the-badge)
![GSSoC-OpenSource](https://img.shields.io/badge/Open%20Source%20Program-GSSoC-orange?style=for-the-badge&logo=opensourceinitiative)
![Built with Love](https://img.shields.io/badge/Built%20with-%E2%9D%A4-red?style=for-the-badge)
<a href="https://github.com/justanuragmaurya/thumbnaily-ai/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" /></a>
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge&logo=git)
<a href="https://github.com/justanuragmaurya/thumbnaily-ai"><img src="https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red?style=for-the-badge" /></a>
 
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

>This Turborepo starter is maintained by the Turborepo core team.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=00C853&center=true&vCenter=true&width=900&lines=Thanks+for+visiting+thumbnaily-ai!+🙌;Start+the+repo+✅;Share+it+with+others+🌍;Contribute+and+grow+🛠️;Happy+Coding+✨!" alt="Thanks Banner Typing SVG" />
</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**📊 Project Insights**

<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Closed PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/justanuragmaurya/thumbnaily-ai?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/justanuragmaurya/thumbnaily-ai?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/justanuragmaurya/thumbnaily-ai?style=flat&logo=github"/></td>
            <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/justanuragmaurya/thumbnaily-ai?style=flat&logo=github"/></td>
            <td><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/justanuragmaurya/thumbnaily-ai?style=flat&color=critical&logo=github"/></td>
            <td><img alt="Languages Count" src="https://img.shields.io/github/languages/count/justanuragmaurya/thumbnaily-ai?style=flat&color=green&logo=github"></td>
            <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/justanuragmaurya/thumbnaily-ai?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**Using this example**

Run the following command:

```sh
npx create-turbo@latest
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**What's inside?**

This Turborepo includes the following packages/apps:

***Apps and Packages***

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

***Utilities***

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

***Build***

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

***Develop***

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

***Remote Caching***

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**Useful Links**

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**🤝 Contributing**

We love contributions from the community! Whether it's a bug report, a new feature, or a documentation improvement, we appreciate your help.

***How to Contribute***

1.  **Fork the repository** and create a new branch for your changes.
2.  **Make your changes** and ensure everything is working as expected.
3.  **Submit a pull request** with a clear description of your changes.

***Found a Bug?***

-   Check the [issue tracker](https://github.com/justanuragmaurya/thumbnaily-ai/issues) to see if the bug has already been reported.
-   If not, open a new issue and provide as much detail as possible.

***Have a Feature Idea?***

-   We'd love to hear it! Open an issue to discuss your idea.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**📜 Code of Conduct**

Please refer to the [`Code of Conduct`](https://github.com/justanuragmaurya/thumbnaily-ai/blob/main/CODE_OF_CONDUCT.md) for details on contributing guidelines and community standards.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**🤝👤 Contribution Guidelines**

We love our contributors! If you'd like to help, please check out our [`CONTRIBUTE.md`](https://github.com/justanuragmaurya/thumbnaily-ai/blob/main/CONTRIBUTING.md) file for guidelines.

>Thank you once again to all our contributors who has contributed to **thumbnaily-ai!** Your efforts are truly appreciated. 💖👏

<!-- Contributors badge (auto-updating) -->

[![Contributors](https://img.shields.io/github/contributors/justanuragmaurya/thumbnaily-ai?style=for-the-badge)](https://github.com/justanuragmaurya/thumbnaily-ai/graphs/contributors)

<!-- Contributors avatars (auto-updating) -->
<p align="left">
  <a href="https://github.com/justanuragmaurya/thumbnaily-ai/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=justanuragmaurya/thumbnaily-ai" alt="Contributors" />
  </a>
</p>

See the full list of contributors and their contributions on the [`GitHub Contributors Graph`](https://github.com/justanuragmaurya/thumbnaily-ai/graphs/contributors).

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<h2 align="center">
<p style="font-family:var(--ff-philosopher);font-size:3rem;"><b> Show some <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" alt="Red Heart" width="40" height="40" /> by starring this awesome repository!
</p>
</h2>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**💡 Suggestions & Feedback**

Feel free to open issues or discussions if you have any feedback, feature suggestions, or want to collaborate!

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**🙌 Show Your Support**

*If you find thumbnaily-ai project helpful, give it a star! ⭐ to support more such educational initiatives:*

- Giving the repo a ⭐ on GitHub
- Sharing it with your developer friends
- Contributing to the project

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**📄 License**

This project is licensed under the MIT License - see the [`License`](https://github.com/justanuragmaurya/thumbnaily-ai/blob/main/LICENSE) file for details.

> A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**⭐ Stargazers**

<div align="center">
  <a href="https://github.com/justanuragmaurya/thumbnaily-ai/stargazers">
    <img src="https://reporoster.com/stars/justanuragmaurya/thumbnaily-ai?type=svg&limit=100&names=false" alt="Stargazers" />
  </a>
</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**🍴 Forkers**

<div align="center">
  <a href="https://github.com/justanuragmaurya/thumbnaily-ai/members">
    <img src="https://reporoster.com/forks/justanuragmaurya/thumbnaily-ai?type=svg&limit=100&names=false" alt="Forkers" />
  </a>
</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<h1 align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /> Give us a Star and let's make magic! <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /></h1>

<p align="center">
     <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mirror%20Ball.png" alt="Mirror Ball" width="150" height="150" />
</p>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<h3 align="center"> 👨‍💻 Built with ❤️ by thumbnaily-ai Team </h3>

<h4 align="center"> ❤️ Anurag Maurya and Contributors ❤️ </h4>

<p align="center">
  <a href="https://github.com/justanuragmaurya/thumbnaily-ai/issues">Open an Issue</a> | <a href="https://thumbnaily.in/">Watch Demo</a>
</p>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<p align="center">
  <a href="#top" style="font-size: 18px; padding: 8px 16px; display: inline-block; border: 1px solid #ccc; border-radius: 6px; text-decoration: none;">
    ⬆️ Back to Top
  </a>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=65&section=footer"/>

> Ready to show off your coding achievements? Get started with **thumbnaily-ai** today! 🚀
