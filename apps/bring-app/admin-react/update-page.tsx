import React, { useEffect } from "react"
import { useUpdateData } from "./hooks/use-update-data"
import { useGetData } from "./hooks/use-get-data"

export const UpdatePage = () => {
    const searchParams = new URLSearchParams(document.location.search)
    const id = searchParams.get("id")
    if (!id) {
        return (
            <p>
                Missing id! Hint: add an `id` query param to get a better
                result!
            </p>
        )
    }

    const {
        title,
        setTitle,
        description,
        setDescription,
        isPending,
        response: updateResponse,
        submit,
    } = useUpdateData({
        defaultDescription: "",
        defaultTitle: "",
    })

    useEffect(() => {
        if (updateResponse) {
            document.location.href = `/wp-admin/admin.php?page=post-read-page&id=${id}`
        }
    }, [updateResponse])

    const { data } = useGetData({
        id,
    })

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDescription(data.description)
        }
    }, [data])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await submit(id)
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="title"
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                value={title}
            />
            <input
                type="text"
                name="description"
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                value={description}
            />

            <button type="submit">Submit</button>
            {isPending && <p>Loading...</p>}
        </form>
    )
}
