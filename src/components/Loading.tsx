import React from 'react';

type Props = {
    loading: boolean;
}

const Loading: React.FC<Props> = ({loading}) => {
    if (!loading) {
        return <div></div>;
    }

    return (
        <div className='loading'>
            <div className='loading-image'>
                <img
                src='https://techpit-market-prod.s3.amazonaws.com/uploads/part_attachment/file/29769/b888297f-8bbe-44c8-b4a9-6cf855be8dfe.gif'
                alt='golf-gif'
                />
            </div>
        </div>
    );
};

export default Loading;