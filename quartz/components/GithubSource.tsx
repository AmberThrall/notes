import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/githubSource.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { ExplorerNode, FileNode, Options } from "./ExplorerNode"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const GithubSource: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
return (
  <div class={classNames(displayClass, "github-source")}>
    <h3>Source code</h3>
    <ul>
      <li>
        <a href={`https://github.com/AmberThrall/notes/blob/main/${fileData.filePath}`}>
          Source
        </a>
      </li>
      <li>
        <a href={`https://github.com/AmberThrall/notes/commits/main/${fileData.filePath}`}>
          History
        </a>
      </li>
    </ul>
  </div>
)
}


GithubSource.css = style
export default (() => GithubSource) satisfies QuartzComponentConstructor
