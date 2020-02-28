declare module "react-github-fork-ribbon" {
    import { FC } from "react";
    const GitHubForkRibbon: FC<any>;
    export = GitHubForkRibbon;
}

declare module "raw.macro" {
    export const raw: (x: string) => string;

    export default raw;
}
