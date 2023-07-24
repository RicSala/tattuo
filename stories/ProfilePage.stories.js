import ProfilePageClient from '@/app/(site)/admin/profile/ProfilePageClient';
import { AuthContext } from '@/providers/auth/AuthProvider';
import { UiContext } from '@/providers/ui/UiProvider';



// Mock context data
const mockContext = {
    removeBoardFromUser: () => console.log('removeBoardFromUser triggered'),
    onOpenLoginModal: () => console.log('onOpenLoginModal triggered'),
};




// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'pages/ProfilePage',
    component: ProfilePageClient,
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
    }
};

export const Default = (args) => <ProfilePageClient {...args} />;
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
