import React from "react"
import CodeTabs from "../tab-code-block"
import raw from "raw.macro"
const cmd = raw("./cmd.bat")
const bash = raw("./bash.sh")
const powershell = raw("./powershell.ps1")

interface IProps {
    value: number,
    setValue: { (x: number): void }
}

export function UsingACR(props: IProps) {

    return <CodeTabs blocks={[
        ["bash","shell", bash],
        ["Powershell","powershell",  powershell],
        ["CMD","shell",  cmd]
    ]} { ...props}/>
}

export default UsingACR
