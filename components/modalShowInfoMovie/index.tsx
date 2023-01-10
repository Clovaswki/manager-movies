import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

type Props = {
    modalOpen: {
        open: boolean,
        content: any
    }
}

const ModalShowInfoMovie: React.FC<Props> = ({modalOpen}) => {

    const [open, setOpen] = useState(modalOpen.open);
    const [data, setData] = useState(modalOpen.content)

    useEffect(() => {

        setOpen(modalOpen.open)
        setData(modalOpen.content)

    }, [modalOpen])

    return (
        <>
            <Modal
                title={data?.title}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                bodyStyle={{height: '80vh'}}
            >
                <img 
                    src={'https://image.tmdb.org/t/p/original/' + data?.poster_path} 
                    style={{
                        width: '100%',
                        height:"300px",
                        objectFit: 'cover',
                        backgroundPositionY: '200%'
                    }}
                />
            </Modal>
        </>
    )
}

export default ModalShowInfoMovie


