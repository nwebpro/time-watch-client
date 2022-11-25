import React from 'react';
import { MdVerified } from 'react-icons/md'

const UserVerified = ({ seller }) => {
    return (
            <div className="tooltip" data-tip={`${seller.status ? 'Verified' : 'Unverified'}`}>
                <MdVerified className={`${seller.status ? 'text-[#3F8DF3]' : 'text-gray-400'}`} />
            </div>
    );
};

export default UserVerified;