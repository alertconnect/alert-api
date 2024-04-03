import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import { ChatsModule } from './chats/chats.module';
import { SectorsModule } from './sector/sectors.module';
import { AlertsModule } from './alerts/alerts.module';
import { HealthModule } from './health/health.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/sectors', module: SectorsModule },
      { path: '/chats', module: ChatsModule },
      { path: '/alerts', module: AlertsModule },
      { path: '/health', module: HealthModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    SectorsModule,
    ChatsModule,
    AlertsModule,
    HealthModule,
  ],
})
export default class V1Module {}
