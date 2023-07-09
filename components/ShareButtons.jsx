import FacebookShareButton from 'react-share/lib/FacebookShareButton';
import FacebookIcon from 'react-share/lib/FacebookIcon';
import { PinterestIcon, PinterestShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

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
            >
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
                url={url}
                title={whatsappTitle}
                separator=':: '
            >
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <PinterestShareButton
                media={pinterestImage}
                description={pinterestDescription}
            >
                <PinterestIcon size={32} round={true} />
            </PinterestShareButton>



        </div>
    )
};
export default ShareButtons;