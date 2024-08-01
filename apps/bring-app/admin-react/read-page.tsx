import React, { useEffect } from "react"
import { useGetData } from "./hooks/use-get-data"
import { useDeleteData } from "./hooks/use-delete-data"

export const ReadPage = () => {
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

    const { data, isPending, isError } = useGetData({
        id,
    })

    const { submit, response: deleteResponse } = useDeleteData()

    useEffect(() => {
        if (deleteResponse) {
            document.location.href = "/wp-admin/admin.php?page=post-list-page"
        }
    }, [deleteResponse])

    return (
        <>
            {isPending && <p>Loading...</p>}
            {isError && <p>Error</p>}

            {data && (
                <div
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                    <a
                        href={`/wp-admin/admin.php?page=post-update-page&id=${data.id}`}
                    >
                        Edit
                    </a>
                    <button type="button" onClick={() => submit(data.id)}>
                        Delete
                    </button>
                </div>
            )}
        </>
    )
}
