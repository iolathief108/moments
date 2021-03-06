import { VendorType } from "../../http/generated";
import { getBaseUrl, getVendorTypeIcon, getVendorTypeInfo } from "../../utils/other";
import { commonState } from "../../state";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isDev } from "../../utils/pageUtils";
import { LIGHT_BLUE_COLOR } from "../../utils/colors";
import { useState } from "react";


const Name = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-family: Roboto, sans-serif;
  color: #1c1c1c;
  @media (min-width: 767px) {
    margin-bottom: -6px;
    font-weight: 500;
    font-size: 20px;
    transition: color .1s ease;
  }
`;

const Vendor = styled.div`
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  text-transform: capitalize;
  font-family: Roboto, sans-serif;
  color: #505050;
  @media (min-width: 767px) {
    color: #333333;
    font-weight: 400;
    margin-bottom: 2px;
    font-size: 13px;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  color: #2a2a2a;
  @media (min-width: 767px) {
    font-weight: 500;
    color: #1f1f1f;
    font-size: 13px;
  }
`;

const Svg = styled.svg`
  width: 14px;
  height: 14px;
  margin-right: 4px;
  margin-bottom: 1px;
  @media (min-width: 767px) {
    margin-right: 3px;
    width: 13px;
    height: 13px;
  }
`;

type Props = {
    photoUrl: string;
    vType: VendorType;
    businessName: string;
    businessSlug?: string
    districtDisplayName: string;
    vid: string;
    height?: string
};

function buildUrl(str: string) {
    return getBaseUrl() + `/p/${str}_600x420q60.jpg`;
}

function getProductLink(bName: string, vType: VendorType, vid?: string) {
    return `/wedding-vendors/${getVendorTypeInfo(vType)?.slug}/${bName}/?vid=${vid ?? ""}`;
}

const Container = styled.div`
  color: rgba(33, 32, 31, 0.9);
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  background-color: transparent;


  .img {
    position: relative;
    z-index: 2;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }

  .bg {
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    height: 80px;
    z-index: 1;
  }

  @media (min-width: 767px) {
    a:hover .business-name {
      color: ${LIGHT_BLUE_COLOR};
    }
  }
`;

export function VendorCard(props: Props) {
    const [isMobile] = commonState.useGlobalState("isMobile");
    const [visible, setVisible] = useState<boolean>(false);
    const [bgLoaded, setBgLoaded] = useState<boolean>(false);


    const ImageContainer = styled.div`
      overflow: hidden;
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 32%) 1px 2px 6px;
      background-color: #ddd;
      width: 100%;
      height: 70%;

      .img {
        transform: scale(1.01);
      }

      @media (min-width: 767px) {
        box-shadow: none;
        transition: all 0.1s ease;
        &:hover {
          box-shadow: rgb(0 0 0 / 32%) 1px 2px 6px;
        }
      }
    `;

    return (
        <Container className={`col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12`}>
            <Link to={getProductLink(props.businessSlug || props.businessName, props.vType, props.vid)}
                  target={isMobile || isDev ? null : "_blank"}>

                <ImageContainer
                    style={{ height: !visible ? (props.height || "217px") : undefined }}>
                    {
                        <img
                            style={{ opacity: bgLoaded && visible ? 1 : 0 }}
                            onLoad={() => setVisible(true)}
                            className={"img"}
                            src={buildUrl(props.photoUrl)} />
                    }
                    <img onLoad={() => setBgLoaded(true)} className={"bg"} height={80}
                         src={getVendorTypeIcon(props.vType)} />
                </ImageContainer>

                {
                    // props.height &&
                    <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        <Vendor>{getVendorTypeInfo(props.vType)?.displayName}</Vendor>
                        <Name className={"business-name"}>{props.businessName}</Name>
                        <Location>
                            <Svg role="img" viewBox="0 0 18 23" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M9.25.507C4.456.507.583 4.475.583 9.352c0 3.22 2.585 7.357 7.683 12.633.538.556 1.43.556 1.968 0l.437-.456c4.809-5.059 7.246-9.05 7.246-12.177 0-4.877-3.873-8.845-8.667-8.845zm0 2.737c3.268 0 5.93 2.727 5.93 6.108l-.002.103c-.06 2.047-1.887 5.15-5.53 9.155l-.398.433-.014-.015C5.273 14.75 3.32 11.467 3.32 9.352c0-3.381 2.663-6.108 5.93-6.108zm0 1.368a4.105 4.105 0 100 8.21 4.105 4.105 0 000-8.21zm0 2.737a1.368 1.368 0 110 2.737 1.368 1.368 0 010-2.737z" />
                            </Svg>
                            <span>
                              {props.districtDisplayName.replace("(1 - 15)", "")}
                        </span>
                        </Location>
                    </div>
                }
            </Link>
        </Container>
    );
}
