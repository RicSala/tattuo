'use client'

import FacebookShareButton from 'react-share/lib/FacebookShareButton';
import { PinterestShareButton, WhatsappShareButton } from 'react-share';
import { BsFacebook, BsPinterest, BsWhatsapp } from 'react-icons/bs';

const ShareButtons = ({
    url,
    facebookQuote,
    facebookHashtag,
    whatsappTitle,
    pinterestImage,
    pinterestDescription,
}) => {
    return (
        <div className='
        flex flex-row justify-center items-center gap-3
        '>

            <FacebookShareButton
                url={url}
                quote={"Check out this awesome article!"}
                hashtag={"#tattoo"}
            >
                <BsFacebook size={20} />

            </FacebookShareButton>

            <WhatsappShareButton
                url={url}
                title={whatsappTitle}
                separator=':: '
            >
                <BsWhatsapp size={20} />
            </WhatsappShareButton>

            <PinterestShareButton
                media={pinterestImage}
                description={pinterestDescription}
            >
                <BsPinterest size={20} />
            </PinterestShareButton>



        </div>
    )
};
export default ShareButtons;