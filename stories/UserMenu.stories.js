import UserMenu from '@/components/navbar/UserMenu';
import { UiContext } from '@/providers/ui/UiProvider';



// Mock context data
const mockContext = {
    onOpenRegisterModal: () => console.log('onOpenRegisterModal triggered'),
    onOpenRegisterArtistModal: () => console.log('onOpenRegisterArtistModal triggered'),
    onOpenLoginModal: () => console.log('onOpenLoginModal triggered'),
    onOpenRentModal: () => console.log('onOpenRentModal triggered'),
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'ui/UserMenu',
    component: UserMenu,
    decorators: [
        (Story) => (
            <UiContext.Provider value={mockContext}>
                <div className='flex flex-row justify-center'>
                    <Story />
                </div>
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
};

export const Default = (args) => <UserMenu {...args} />;
Default.args = {
    currentUser: {
        role: 'CLIENT',
        // Add any other necessary properties for the currentUser object
    },
};
export const LoggedOut = (args) => <UserMenu {...args} />;
Default.args = {
    currentUser: {
        role: 'CLIENT',
        // Add any other necessary properties for the currentUser object
    },
};


