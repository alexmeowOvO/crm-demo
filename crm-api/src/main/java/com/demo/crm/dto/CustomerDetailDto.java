package com.demo.crm.dto;

import java.util.List;

public record CustomerDetailDto(
        Long id,
        String name,
        String stage,
        String owner,
        List<InteractionDto> interactions
) {}