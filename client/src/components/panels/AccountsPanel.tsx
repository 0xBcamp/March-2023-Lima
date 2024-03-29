// Import the required dependencies
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Image from 'next/image';
import defaultProfilePicture from '../../../public/profile.jpg';
import { setSidePanelSelectedAccount } from '../../../store/slices/sidePanelSlice';

const AccountsPanel: React.FC = () => {
    const dispatch = useAppDispatch();

    const accounts = useAppSelector((state) => state.account.accounts);
    const selectedAccount = useAppSelector((state) => state.account.selectedAccount);

    return (
        <>
            {accounts && accounts.map((account, index) => {
                return (
                    <div
                        key={index}
                        className={`flex items-center text-sm p-1 border-b-2 border-gray-200 hover:cursor-pointer hover:bg-blue-50 ${selectedAccount?.address === account.address ? "bg-blue-200" : ""}`}
                        onClick={() => {dispatch(setSidePanelSelectedAccount({selectedAccount: account}));}}
                    >
                        <Image src={defaultProfilePicture} alt="Profile" className="rounded-full mr-2" width={32} height={32} />
                        <div className="flex-grow">
                            <div className="flex">
                                <div className='font-semibold grow'>{account.name}</div>
                                <div className='text-xs'>{1000}</div>
                            </div>
                            <div className="text-gray-500 text-xs">{account.address}</div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default AccountsPanel;