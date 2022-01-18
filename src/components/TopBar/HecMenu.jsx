import { useState, useEffect } from "react";
import { addresses, TOKEN_DECIMALS } from "../../constants";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as sNOVATokenImg } from "../../assets/tokens/SNOVA.svg";
import { ReactComponent as NOVATokenImg } from "../../assets/tokens/NOVA.svg";

import "./hecmenu.scss";
import { useWeb3Context } from "../../hooks/web3Context";

import NOVAImg from "src/assets/tokens/NOVA.png";
import sNOVAImg from "src/assets/tokens/SNOVA.png";
const addTokenToWallet = (tokenSymbol, tokenAddress) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    // NOTE (appleseed): 33T token defaults to sHEC logo since we don't have a 33T logo yet
    let tokenPath, decimals;
    // if (tokenSymbol === "HEC") {

    // } ? NOVAImg : sNOVAImg;
    switch (tokenSymbol) {
      case "NOVA":
        tokenPath = NOVAImg;
        decimals = 9;
        break;
      default:
        tokenPath = sNOVAImg;
    }
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: TOKEN_DECIMALS,
            image: imageURL,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

function HecMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID } = useWeb3Context();

  const networkID = chainID;

  const SNOVA_ADDRESS = addresses[networkID].SNOVA_ADDRESS;
  const NOVA_ADDRESS = addresses[networkID].NOVA_ADDRESS;
  const USDC_ADDRESS = addresses[networkID].USDC_ADDRESS;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = "hec-popper";
  return (
    <Box
      component="div"
      onMouseEnter={e => handleClick(e)}
      onMouseLeave={e => handleClick(e)}
      id="hec-menu-button-hover"
    >
      <Button id="hec-menu-button" size="large" variant="contained" color="secondary" title="NOVA" aria-describedby={id}>
        <SvgIcon component={InfoIcon} color="primary" />
        <Typography>NOVA</Typography>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="hec-menu" elevation={1}>
                <Box component="div" className="buy-tokens">
                  <Link
                    href={`https://traderjoexyz.com/#/trade?inputCurrency=&outputCurrency=${NOVA_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        Buy on Trader Joe <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>

                  {/* <Link
                    href={`https://swap.spiritswap.finance/#/add/${USDC_ADDRESS}/${NOVA_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        Buy on SpiritSwap <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link> */}
                </Box>

                {isEthereumAPIAvailable ? (
                  <Box className="add-tokens">
                    <Divider color="secondary" />
                    <p>ADD TOKEN TO WALLET</p>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Button variant="contained" color="secondary" onClick={addTokenToWallet("NOVA", NOVA_ADDRESS)}>
                        <SvgIcon
                          component={NOVATokenImg}
                          viewBox="0 0 32 32"
                          style={{ height: "25px", width: "25px" }}
                        />
                        <Typography variant="body1">NOVA</Typography>
                      </Button>
                      <Button variant="contained" color="secondary" onClick={addTokenToWallet("sNOVA", SNOVA_ADDRESS)}>
                        <SvgIcon
                          component={sNOVATokenImg}
                          viewBox="0 0 100 100"
                          style={{ height: "25px", width: "25px" }}
                        />
                        <Typography variant="body1">sNOVA</Typography>
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default HecMenu;
