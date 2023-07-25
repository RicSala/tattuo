import TattooCard from '@/components/listings/TattooCard';
import { AuthContext } from '@/providers/auth/AuthProvider';
import { UiContext } from '@/providers/ui/UiProvider';



// Mock context data
const mockContext = {
    removeBoardFromUser: () => console.log('removeBoardFromUser triggered'),
    onOpenLoginModal: () => console.log('onOpenLoginModal triggered'),
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'listings/tattooCard',
    component: TattooCard,
    decorators: [
        (Story) => (
            <UiContext.Provider value={mockContext}>
                <AuthContext.Provider value={mockContext}>
                    <div className='flex flex-row justify-center'>
                        <Story />
                    </div>
                </AuthContext.Provider>
            </UiContext.Provider>
        ),
    ],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },

    args: {
        currentUser: {
            role: 'CLIENT',
            // Add any other necessary properties for the currentUser object
        },

        data: {
            id: '64b96c8027f6539332a850f8',
            title: 'Tattoo 1',
            description: 'This is a description',
            price: 100,
            imageSrc: 'https://loremflickr.com/cache/resized/65535_52729146932_b9d4d6aaff_c_512_512_nofilter.jpg',
        },
        listingType: 'tattoos',
        onAction: () => console.log('onAction triggered'),
        test: 'test',
        actionLabel: 'Action',
        onSecondaryAction: () => console.log('onSecondaryAction triggered'),
        secondaryActionLabel: 'Secondary Action',
        disabled: false,
        actionId: '64b96c8027f6539332a850f8',
        currentUser: {
            role: 'CLIENT',
            // Add any other necessary properties for the currentUser object
        },

        boardAdder: false,
        canLike: false,
        canSave: false,
    }
};

export const Default = (args) => <TattooCard {...args} />;
Default.args = {
    currentUser: {
        role: 'CLIENT',
        // Add any other necessary properties for the currentUser object
    },
    canLike: true,
    canSave: true,
    boardAdder: true,
    actionLabel: undefined,
    secondaryActionLabel: undefined,
};
export const ArtistIsOwner = (args) => <TattooCard {...args} />;
ArtistIsOwner.args = {
    currentUser: {
        role: 'CLIENT',
        // Add any other necessary properties for the currentUser object
    },


};


