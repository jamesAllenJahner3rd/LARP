import React from 'react'






interface Props {
    params: { poop: string }; // should be string, not number
}

const Poop = async ({ params }: { params: Props["params"] }) => {
    const { poop } = await params;

    return <div>Poop {poop}</div>;
};

export default Poop;