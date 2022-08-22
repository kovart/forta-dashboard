import Check from '@assets/icons/check.svg';
import CheckRadio from '@assets/icons/check-radio.svg';
import ExternalLink from '@assets/icons/external-link.svg';
import ChevronDown from '@assets/icons/chevron-down.svg';
import Clock from '@assets/icons/clock.svg';
import Refresh from '@assets/icons/refresh.svg';
import Cross from '@assets/icons/cross.svg';
import Filter from '@assets/icons/filter.svg';
import Flag from '@assets/icons/flag.svg';
import Plus from '@assets/icons/plus.svg';
import PlusCircle from '@assets/icons/plus-circle.svg';
import Search from '@assets/icons/search.svg';
import Tool from '@assets/icons/tool.svg';
import Zap from '@assets/icons/zap.svg';
import Eye from '@assets/icons/eye.svg';
import EyeOff from '@assets/icons/eye-off.svg';
import MoreVertical from '@assets/icons/more-vertical.svg';
import Code from '@assets/icons/code.svg';
import ArrowRight from '@assets/icons/arrow-right.svg';
import AtSign from '@assets/icons/at-sign.svg';
import Bell from '@assets/icons/bell.svg';
import Box from '@assets/icons/box.svg';
import Calendar from '@assets/icons/calendar.svg';
import Coffee from '@assets/icons/coffee.svg';
import CPU from '@assets/icons/cpu.svg';
import CreditCard from '@assets/icons/credit-card.svg';
import Edit from '@assets/icons/edit.svg';
import Edit2 from '@assets/icons/edit-2.svg';
import Fork from '@assets/icons/fork.svg';
import PullRequest from '@assets/icons/git-pull-request.svg';
import Loader from '@assets/icons/loader.svg';
import Maximize from '@assets/icons/maximize.svg';
import Save from '@assets/icons/save.svg';
import Sort from '@assets/icons/sort.svg';
import Star from '@assets/icons/star.svg';
import Terminal from '@assets/icons/terminal.svg';

export const IconSymbols = {
  ArrowRight,
  AtSign,
  Bell,
  Box,
  Calendar,
  Coffee,
  CPU,
  CreditCard,
  Edit,
  Edit2,
  Fork,
  PullRequest,
  Loader,
  Maximize,
  Save,
  Sort,
  Star,
  Terminal,
  Check,
  CheckRadio,
  ChevronDown,
  ExternalLink,
  Clock,
  Refresh,
  Cross,
  Filter,
  Flag,
  Plus,
  PlusCircle,
  Search,
  Tool,
  Zap,
  Eye,
  EyeOff,
  MoreVertical,
  Code
};

const prepare = (symbol) => symbol?.url.split('#')[1];

Object.keys(IconSymbols).forEach(
  (key) => (IconSymbols[key] = prepare(IconSymbols[key]))
);
