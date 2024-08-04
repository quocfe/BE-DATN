import { Response, Request } from 'express';
import fanpageService from '../services/fanpageService';
import { sendResponseSuccess } from '../utils/response';
import { FanpageInput } from '../types/fanpage.type';
import { CustomErrorHandler } from '../utils/ErrorHandling';
import { StatusCodes } from 'http-status-codes';

class FanpageController {
  async createFanpage(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user;
      const fanpageData: FanpageInput = req.body;
      const data = await fanpageService.createFanpage(fanpageData, user_id);
      sendResponseSuccess(res, data);
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không thể tạo fanpage!');
    }
  }

  async updateFanpage(req: Request, res: Response) {
    const { fanpageId } = req.params;
    const fanpageData: FanpageInput = req.body;
    const data = await fanpageService.updateFanpage(fanpageId, fanpageData);
    sendResponseSuccess(res, data);
  }

  async deleteFanpage(req: Request, res: Response) {
    const { fanpageId } = req.params;
    const data = await fanpageService.deleteFanpage(fanpageId);
    sendResponseSuccess(res, data);
  }

  async getFanpageDetail(req: Request, res: Response) {
    const { fanpageId } = req.params;
    const data = await fanpageService.getFanpageDetail(fanpageId);
    sendResponseSuccess(res, data);
  }

  async getFanpagesByUserId(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user;
      const data = await fanpageService.getFanpagesByUserId(user_id);
      sendResponseSuccess(res, data);
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không thể lấy fanpage!');
    }
  }

  async getAllFanpages(req: Request, res: Response) {
    const data = await fanpageService.getAllFanpages();
    sendResponseSuccess(res, data);
  }

  async inviteMember(req: Request, res: Response) {
    const { fanpageId, memberId } = req.body;
    const data = await fanpageService.inviteMember(fanpageId, memberId);
    sendResponseSuccess(res, data);
  }

  async leaveFanpage(req: Request, res: Response) {
    const { fanpageId } = req.params;
    if (req.user) {
      const { user_id } = req.user;
      const data = await fanpageService.leaveFanpage(fanpageId, user_id);
      sendResponseSuccess(res, data);
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không thể rời khỏi fanpage!');
    }
  }

  async followFanpage(req: Request, res: Response) {
    const { fanpageId } = req.params;
    if (req.user) {
      const { user_id } = req.user;
      const data = await fanpageService.followFanpage(fanpageId, user_id);
      sendResponseSuccess(res, data);
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không thể theo dõi fanpage!');
    }
  }

  async unfollowFanpage(req: Request, res: Response) {
    const { fanpageId } = req.params;
    if (req.user) {
      const { user_id } = req.user;
      const data = await fanpageService.unfollowFanpage(fanpageId, user_id);
      sendResponseSuccess(res, data);
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không thể bỏ theo dõi fanpage!');
    }
  }

  async getFanpageMembers(req: Request, res: Response) {
    const { fanpageId } = req.params;
    const data = await fanpageService.getFanpageMembers(fanpageId);
    sendResponseSuccess(res, data);
  }

  async getAllFanpageMembers(req: Request, res: Response) {
    const data = await fanpageService.getAllFanpageMembers();
    sendResponseSuccess(res, data);
  }
}

export default new FanpageController();
