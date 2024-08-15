// // Part A working code:
// //my-nft-marketplace/contracts_frontend/src/components/ConnectWalletButton.tsx 
// import React from 'react';
// import { Button } from '@mui/material';
// import { useConnect, useAccount, useDisconnect } from 'wagmi';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { Connector } from 'wagmi/connectors';

// const isMetaMaskConnector = (connector: Connector<any, any>): connector is MetaMaskConnector => {
//     return connector instanceof MetaMaskConnector;
// };

// const ConnectWalletButton: React.FC = () => {
//     const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
//     const { disconnect } = useDisconnect();
//     const { isConnected } = useAccount();

//     const handleConnect = (connector: MetaMaskConnector) => {
//         if (pendingConnector) {
//             return;
//         }
//         connect({ connector });
//     };

//     const metaMaskConnectors = connectors.filter(isMetaMaskConnector);

//     return (
//         <div style={{ textAlign: 'center', marginTop: 20 }}>
//             {isConnected ? (
//                 <Button variant="contained" color="primary" onClick={() => disconnect()}>
//                     Disconnect
//                 </Button>
//             ) : (
//                 metaMaskConnectors.length > 0 && (
//                     <Button
//                         key={metaMaskConnectors[0].id}
//                         variant="contained"
//                         color="primary"
//                         disabled={!metaMaskConnectors[0].ready || isLoading || !!pendingConnector}
//                         onClick={() => handleConnect(metaMaskConnectors[0])}
//                     >
//                         {metaMaskConnectors[0].name}
//                         {!metaMaskConnectors[0].ready && ' (unsupported)'}
//                         {isLoading && metaMaskConnectors[0].id === pendingConnector?.id && ' (connecting)'}
//                     </Button>
//                 )
//             )}
//             {error && <div>{error.message}</div>}
//         </div>
//     );
// };

// export default ConnectWalletButton;


// //my-nft-marketplace/contracts_frontend/src/components/ConnectWalletButton.tsx 
// import React from 'react';
// import { Button } from '@mui/material';
// import { useConnect, useAccount, useDisconnect } from 'wagmi';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { Connector } from 'wagmi/connectors';

// const isMetaMaskConnector = (connector: Connector<any, any>): connector is MetaMaskConnector => {
//     return connector instanceof MetaMaskConnector;
// };

// const ConnectWalletButton: React.FC = () => {
//     const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
//     const { disconnect } = useDisconnect();
//     const { isConnected } = useAccount();

//     const handleConnect = (connector: MetaMaskConnector) => {
//         if (pendingConnector) {
//             return;
//         }
//         connect({ connector });
//     };

//     const metaMaskConnectors = connectors.filter(isMetaMaskConnector);

//     return (
//         <div style={{ textAlign: 'center', marginTop: 20 }}>
//             {isConnected ? (
//                 <Button variant="contained" color="primary" onClick={() => disconnect()}>
//                     Disconnect
//                 </Button>
//             ) : (
//                 metaMaskConnectors.length > 0 && (
//                     <Button
//                         key={metaMaskConnectors[0].id}
//                         variant="contained"
//                         color="primary"
//                         disabled={!metaMaskConnectors[0].ready || isLoading || !!pendingConnector}
//                         onClick={() => handleConnect(metaMaskConnectors[0])}
//                     >
//                         {metaMaskConnectors[0].name}
//                         {!metaMaskConnectors[0].ready && ' (unsupported)'}
//                         {isLoading && metaMaskConnectors[0].id === pendingConnector?.id && ' (connecting)'}
//                     </Button>
//                 )
//             )}
//             {error && <div>{error.message}</div>}
//         </div>
//     );
// };

// export default ConnectWalletButton;


// Part B code working
import React from 'react';
import { Button } from '@mui/material';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Connector } from 'wagmi/connectors';

const isMetaMaskConnector = (connector: Connector<any, any>): connector is MetaMaskConnector => {
    return connector instanceof MetaMaskConnector;
};

const ConnectWalletButton: React.FC = () => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount();

    const handleConnect = (connector: MetaMaskConnector) => {
        if (pendingConnector) {
            return;
        }
        connect({ connector });
    };

    const metaMaskConnectors = connectors.filter(isMetaMaskConnector);

    return (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
            {isConnected ? (
                <Button variant="contained" color="primary" onClick={() => disconnect()}>
                    Disconnect
                </Button>
            ) : (
                metaMaskConnectors.length > 0 && (
                    <Button
                        key={metaMaskConnectors[0].id}
                        variant="contained"
                        color="primary"
                        disabled={!metaMaskConnectors[0].ready || isLoading || !!pendingConnector}
                        onClick={() => handleConnect(metaMaskConnectors[0])}
                    >
                        {metaMaskConnectors[0].name}
                        {!metaMaskConnectors[0].ready && ' (unsupported)'}
                        {isLoading && metaMaskConnectors[0].id === pendingConnector?.id && ' (connecting)'}
                    </Button>
                )
            )}
            {error && <div>{error.message}</div>}
        </div>
    );
};

export default ConnectWalletButton;
