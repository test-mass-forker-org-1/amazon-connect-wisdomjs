/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Command } from './command';
import { WisdomClientResolvedConfig } from '../wisdomClient';
import { HttpRequest } from '../httpRequest';
import { NotifyRecommendationsReceivedRequest, NotifyRecommendationsReceivedResponse } from '../types/models';
import { ClientMethods } from '../types/clientMethods';
import { InvokeFunction } from '../types/command';
import { HttpResponse, HttpHandlerOptions } from '../types/http';

export interface NotifyRecommendationsReceivedInput extends NotifyRecommendationsReceivedRequest {}

export interface NotifyRecommendationsReceivedOutput extends NotifyRecommendationsReceivedResponse {}

export class NotifyRecommendationsReceived extends Command<
  NotifyRecommendationsReceivedInput,
  NotifyRecommendationsReceivedOutput,
  WisdomClientResolvedConfig
> {
  readonly clientMethod: ClientMethods;

  constructor(readonly clientInput: NotifyRecommendationsReceivedInput) {
    super();
    this.clientMethod = ClientMethods.NotifyRecommendationsReceived;
  }

  resolveRequestHandler(
    configuration: WisdomClientResolvedConfig,
    options: HttpHandlerOptions,
  ): InvokeFunction<HttpResponse<NotifyRecommendationsReceivedOutput>> {
    const { requestHandler } = configuration;
    return () => requestHandler.handle(this.serialize(configuration), options || {});
  }

  serialize(configuration: WisdomClientResolvedConfig): HttpRequest {
    const { assistantId, sessionId, recommendationIds } = this.clientInput;

    if (assistantId === undefined) {
      throw new Error('No value provided for assistandId.');
    } else if (!assistantId.length) {
      throw new Error('Empty value provided for assistantId.');
    }

    if (sessionId === undefined) {
      throw new Error('No value provided for sessionId.');
    } else if (!sessionId.length) {
      throw new Error('Empty value provided for sessionId.');
    }

    if (recommendationIds === undefined) {
      throw new Error('No value provided for recommendationIds.');
    } else if (!recommendationIds.length) {
      throw new Error('Empty value provided for recommendationIds.');
    }

    return super.serialize(configuration);
  }
}
