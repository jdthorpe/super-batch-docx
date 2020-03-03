import React from "react"
import CodeTabs from "../code-block"
import raw from "raw.macro"
const bash = raw("./bash.md")
const powershell = raw("./powershell.md")
const cmd = raw("./cmd.md")

interface IProps {
    value: number,
    setValue: { (x: number): void }
}

export function CreateResources(props: IProps) {

    return <CodeTabs blocks={[
        ["bash", bash],
        ["Powershell", powershell],
        ["CMD", cmd]
    ]} { ...props} />
}

export default CreateResources
