/**
 * Curated Font Awesome icon maps for the Contact section.
 *
 * ContactUS previously did `import * as FaIcons from "react-icons/fa"` (+ fa6),
 * which pulls the ENTIRE Font Awesome set into the bundle (~1.3 MB, and it made
 * the ContactUS chunk ~1.6 MB) because icons are resolved by CMS name at
 * runtime and the namespace import defeats tree-shaking.
 *
 * The contact page only ever renders address / email / phone icons (plus the
 * odd social/info icon). Importing just those by name lets Rollup tree-shake
 * everything else away. Unknown CMS names fall back to the component's
 * `fallback` prop exactly as before.
 *
 * To support a new CMS icon name, add its `Fa*` export here.
 */
import {
  FaPhone,
  FaPhoneAlt,
  FaMobileAlt,
  FaEnvelope,
  FaEnvelopeOpen,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaMapMarker,
  FaMapPin,
  FaLocationArrow,
  FaClock,
  FaRegClock,
  FaFax,
  FaGlobe,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaWhatsapp,
  FaFacebookF,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
  FaAt,
  FaDirections,
} from "react-icons/fa";
import {
  FaPhone as Fa6Phone,
  FaMobileScreen,
  FaEnvelope as Fa6Envelope,
  FaLocationDot,
  FaMapLocationDot,
  FaMapPin as Fa6MapPin,
  FaClock as Fa6Clock,
  FaGlobe as Fa6Globe,
  FaWhatsapp as Fa6Whatsapp,
  FaHouse,
  FaBuilding as Fa6Building,
  FaPaperPlane as Fa6PaperPlane,
  FaAt as Fa6At,
} from "react-icons/fa6";

// Keyed by the resolver's computed `Fa<Name>` key so lookups stay identical.
export const fa6Map = {
  FaPhone: Fa6Phone,
  FaMobileScreen,
  FaEnvelope: Fa6Envelope,
  FaLocationDot,
  FaMapLocationDot,
  FaMapPin: Fa6MapPin,
  FaClock: Fa6Clock,
  FaGlobe: Fa6Globe,
  FaWhatsapp: Fa6Whatsapp,
  FaHouse,
  FaBuilding: Fa6Building,
  FaPaperPlane: Fa6PaperPlane,
  FaAt: Fa6At,
};

export const faMap = {
  FaPhone,
  FaPhoneAlt,
  FaMobileAlt,
  FaEnvelope,
  FaEnvelopeOpen,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaMapMarker,
  FaMapPin,
  FaLocationArrow,
  FaClock,
  FaRegClock,
  FaFax,
  FaGlobe,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaWhatsapp,
  FaFacebookF,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
  FaAt,
  FaDirections,
};
