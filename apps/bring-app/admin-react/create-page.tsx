import React, { useEffect } from "react"
import { useCreateData } from "./hooks/use-create-data"

export const CreatePage = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        isPending,
        response: createResponse,
        submit,
    } = useCreateData()

    useEffect(() => {
        if (createResponse) {
            document.location.href = `/wp-admin/admin.php?page=post-read-page&id=${createResponse.id}`
        }
    }, [createResponse])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await submit()
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
