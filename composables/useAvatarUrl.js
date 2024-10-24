export const useAvatarUrl = () => {
    // get the current user_metadata - contains avatar image
    // public url of the image
    // watch user for any changes - always display image of the user

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const getPublicUrl = () => {
        if (!user.value?.user_metadata?.avatar_url) return null;

        const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(user.value?.user_metadata?.avatar_url);

        return data.publicUrl
    }

    const url = ref(getPublicUrl());

    watch(user, () => url.value = getPublicUrl(), { immediate: true })

    return {
        url
    }
}