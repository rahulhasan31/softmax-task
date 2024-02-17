'use Client'
import { AntdRegistry } from '@ant-design/nextjs-registry';
const  AntProvider= ({children}:{children:React.ReactNode}) => {
    return (
        <AntdRegistry>
            {children}
        </AntdRegistry>
    );
};

export default AntProvider;