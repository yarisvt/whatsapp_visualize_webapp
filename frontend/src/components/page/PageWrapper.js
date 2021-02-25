import './page.scss';

function WrappedPage(Component) {
    return function Page() {
        return (
            <div className='page'>
                <Component/>
            </div>
        );
    }
}

export default WrappedPage;
