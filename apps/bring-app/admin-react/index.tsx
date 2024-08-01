import { createRoot } from "react-dom/client"

import React from "react"
import { ReadPage } from "./read-page"
import { CreatePage } from "./create-page"
import { ListPage } from "./list-page"
import { UpdatePage } from "./update-page"
;(() => {
    let domNode = document.getElementById("root-read-page")
    if (domNode) {
        const root = createRoot(domNode)
        root.render(<ReadPage />)
    }

    domNode = document.getElementById("root-create-page")
    if (domNode) {
        const root = createRoot(domNode)
        root.render(<CreatePage />)
    }

    domNode = document.getElementById("root-update-page")
    if (domNode) {
        const root = createRoot(domNode)
        root.render(<UpdatePage />)
    }

    domNode = document.getElementById("root-list-page")
    if (domNode) {
        const root = createRoot(domNode)
        root.render(<ListPage />)
    }
})()
