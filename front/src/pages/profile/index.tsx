import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage } from '../../components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '../../components/ui/card';
import {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose
} from '../../components/ui/dialog';
import { useGetUserStat } from '@/hooks/userStats';
import { useGetUser } from '@/hooks/user';
import { useGetFriends } from '@/hooks/friends';

const currentUser = {
    name: 'Player',
    rank: '200',
    xp: '2.000.000',
    nbGame: '30',
    nbWin: '30',
    vipTime: '30'
};

const friends = [
    { name: 'Amis 1', url: 'https://thispersondoesnotexist.com/' },
    { name: 'Amis 2', url: 'https://thispersondoesnotexist.com/' },
    { name: 'Amis 3', url: 'https://thispersondoesnotexist.com/' },
    { name: 'Amis 4', url: 'https://thispersondoesnotexist.com/' },
    { name: 'Amis 5', url: 'https://thispersondoesnotexist.com/' },
    { name: 'Amis 6', url: 'https://thispersondoesnotexist.com/' },
    { name: 'Amis 7', url: 'https://thispersondoesnotexist.com/' }
];

const assets = [
    {
        url: 'https://64.media.tumblr.com/0dac7926411dd47c559636ecb9e2cedc/3162bce500e0bd12-18/s100x200/9c7fa4cb54cf9b645072e8fa1d60f298085ea83d.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/1d53c352e6a4b9793f70bb53916d6822/3162bce500e0bd12-c2/s100x200/9f0a5c498e79acb47f4a22aac70cfc7edb87509f.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/69400eced34fa430bde96af3aa85ead5/3162bce500e0bd12-1a/s100x200/a4e0a686746682196b79fe5534069709f72cebad.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/2ece0e0ff04027b5d34fa581130a5a8a/3162bce500e0bd12-06/s100x200/c6052969e4c31fab0de1f82544e1557ec3e4e8f8.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/bae0e55a69240de68ce69f54786ab501/d2196693e4b1506f-98/s250x400/42088ec3a6e249e2d513b133571853ca41056ec9.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/1613d0af3195edd5c93a90c851015887/3162bce500e0bd12-97/s100x200/c18a259abae33886c595678174f6928da2b2535e.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/b0263a4324a83139584b35f4e2e6a9f4/e89bbd9a966c2550-4c/s100x200/91052458f8598fe6f1ab0b501d9857bdc33d6a2a.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/4be2c62c98a2f4bcc1b575159b5f708a/7d74716f24c11adb-12/s100x200/2ce69f1fc4cd38dd9a677dad6fff88aa6b95ca2f.pnj'
    },
    {
        url: 'https://64.media.tumblr.com/a96e8cc5989c3b98a8da70aa622aebb7/7d74716f24c11adb-bd/s100x200/d4cfb2f566708f06e30c80911a2ae8f0a4f87e8b.pnj'
    }
];

const UserProfile: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [tempSelectedAsset, setTempSelectedAsset] = useState(null);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        setTempSelectedAsset(selectedAsset);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        setSelectedAsset(tempSelectedAsset);
        setIsModalOpen(false);
    };

    const changePP = (asset) => {
        console.log(`Change PP ${asset.url}`);
        setTempSelectedAsset(asset);
    };

    const { data, isError, isLoading } = useGetUserStat(1);
    console.log('user stats: ', data);

    const { data: userData, isError: userIsError, isLoading: userIsLoading } = useGetUser(1);
    console.log('user infos:', userData);

    const { data: friendData, isError: friendIsError, isLoading: friendIsLoading } = useGetFriends(1);
    console.log('user friends:', friendData);

    return (
        <>
            <div className="flex justify-between p-5">
                <Button className="bg-[#eec17e]">
                    <a href="/" className="text-[#000000]">
                        Retour
                    </a>
                </Button>
                <Button className="bg-[#eec17e]">Marketplace</Button>
            </div>
            <div className="flex justify-center">
                <div className="text-center relative">
                    <Dialog
                        onClose={handleModalClose}
                        setTempSelectedAsset={setTempSelectedAsset}
                        onSave={handleSave}
                        tempSelectedAsset={tempSelectedAsset}
                    >
                        <DialogTrigger asChild>
                            <Avatar className="w-32 h-32 md:w-48 md:h-48 mx-auto cursor-pointer hover:ring-4 ring-[#eec17e] ring-opacity-50 transition duration-300">
                                <AvatarImage src={selectedAsset?.url ?? `${userData?.picture}`} />
                            </Avatar>
                        </DialogTrigger>
                        <DialogPortal>
                            <DialogContent className="p-7">
                                <DialogHeader>
                                    <DialogTitle>Edit Photo</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center flex-wrap">
                                    {assets.map((asset, index) => (
                                        <div
                                            key={index}
                                            onClick={() => changePP(asset)}
                                            className={`flex items-center bg-purple-100 m-3 rounded-full w-20 h-20 cursor-pointer ${
                                                tempSelectedAsset?.url === asset.url ? 'ring-4 ring-[#eec17e]' : ''
                                            }`}
                                        >
                                            <div className="text-[#37034e] w-full">
                                                {asset.url ? (
                                                    <img
                                                        src={asset.url}
                                                        alt={`Asset ${index}`}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    `Asset ${index}`
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <DialogFooter>
                                    <DialogClose onClick={handleModalClose}>
                                        <Button className="bg-[#eec17e]">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose onClick={handleSave}>
                                        <Button className="bg-[#eec17e]">Save</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </DialogPortal>
                    </Dialog>
                    <h1 className="mt-4 text-[#eec17e]">{data?.user.login}</h1>
                    <h3 className="text-[#eec17e] text-md md:text-lg">
                        Rank: {currentUser.rank} - XP: {userData?.xpPoint}
                    </h3>
                </div>
            </div>
            <div className="flex flex-col md:flex-row p-5 pb-0 md:m-40 md:mt-0">
                <Card className="bg-purple-300 bg-opacity-75 rounded-3xl p-5 w-full md:w-1/2 mx-auto text-white mb-5 md:mr-5 md:mb-0">
                    <div className="flex justify-around">
                        <div className="mb-5 w-48">
                            <div className="text-2xl md:text-3xl text-center text-[#37034e] font-semibold">Games</div>
                            <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">
                                {data?.nbParties}
                            </div>
                        </div>
                        <div className="mb-5 w-48">
                            <div className="text-2xl md:text-3xl text-center text-[#37034e] font-semibold">Wins</div>
                            <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">
                                {data?.nbWin}
                            </div>
                        </div>
                    </div>
                    <div className="text-lg flex justify-center">
                        <h3 className="text-[#37034e]">
                            <strong>
                                Vip depuis : <span className="text-pink-400 font-bold">{currentUser.vipTime}</span> jours !
                            </strong>
                        </h3>
                    </div>
                </Card>
                <Card className="bg-purple-300 bg-opacity-75 rounded-3xl p-5 w-full md:w-1/2 mx-auto md:ml-5">
                    <div className="text-2xl md:text-3xl text-center mb-2 text-[#37034e] font-semibold">Mes amis</div>
                    <ScrollArea className="h-72 w-full rounded-md">
                        <div className="flex flex-col gap-4">
                            {friendData?.map((friend, index) => (
                                <div key={index} className="flex items-center bg-purple-100 p-3 rounded-lg">
                                    <Avatar className="mr-4">
                                        <AvatarImage src={friend.url} />
                                    </Avatar>
                                    <div className="text-[#37034e]">{friend.login}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </>
    );
};

export default UserProfile;