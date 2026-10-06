import PasswordForm from '../../components/PasswordForm';

const ResetPassword = async ({searchParams}) => {
    const {token} = await searchParams;
    console.log(token)
    return (
        <div>
            <PasswordForm token={token}/>
        </div>
    );
};

export default ResetPassword;