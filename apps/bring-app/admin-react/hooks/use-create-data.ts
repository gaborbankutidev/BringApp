import { useState } from "react"

type Data = {
    id: string
    title: string
    description: string
}

export const useCreateData = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [json, setJson] = useState<Data>()

    const submit = async () => {
        setIsPending(true)
        const response = await fetch("/wp-json/bring/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        })
        const json = await response.json()
        setJson(json)
        setIsPending(false)
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        isPending,
        response: json,
        submit,
    }
}
