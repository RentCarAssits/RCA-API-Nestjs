import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { AccountPayableApplicationService } from '../application/services/accountPayable-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterAccountPayableResponse } from '../application/reponses/register-accountPayable.response';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterAccountPayableRequest } from '../application/requests/register-accountPayable.request';
import { ApiController } from 'src/shared/api/api.controller';
import { Result } from 'typescript-result';


@Controller('accountPayable')
export class AccountPayableController {
  constructor(
    private readonly accountPayableService: AccountPayableApplicationService,
    private readonly queryBus: QueryBus
  ) { }

  @Post('register')
  async register(
    @Body() registerAccountPayableRequest: RegisterAccountPayableRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAccountPayableResponse> =
        await this.accountPayableService.register(registerAccountPayableRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}