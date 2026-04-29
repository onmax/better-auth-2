const { session, user } = useUserSession()

const role: string | null | undefined = user.value?.role
const impersonatedBy: string | null | undefined = session.value?.impersonatedBy

void role
void impersonatedBy
