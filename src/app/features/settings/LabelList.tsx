"use client"
import React from "react"


function LabelList({
    isLabelsButtonPressed,
    setIslabelsButtonPressed,
}: {
    isLabelsButtonPressed: boolean
    setIslabelsButtonPressed: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (<>
        {isLabelsButtonPressed && <div>TEST</div>}
    </>
    )
}

export default LabelList