# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: midrissi <midrissi@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/02/03 09:24:41 by midrissi          #+#    #+#              #
#    Updated: 2019/06/17 16:59:53 by aben-azz         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#
##	COLORS
#

_END		=	\x1b[0m
_BOLD		=	\x1b[1m
_UNDER		=	\x1b[4m
_REV		=	\x1b[7m
_GREY		=	\x1b[30m
_RED		=	\x1b[31m
_GREEN		=	\x1b[32m
_YELLOW		=	\x1b[33m
_BLUE		=	\x1b[34m
_PURPLE		=	\x1b[35m
_CYAN		=	\x1b[36m
_WHITE		=	\x1b[37m
_IGREY		=	\x1b[40m
_IRED		=	\x1b[41m
_IGREEN		=	\x1b[42m
_IYELLOW	=	\x1b[43m
_IBLUE		=	\x1b[44m
_IPURPLE	=	\x1b[45m
_ICYAN		=	\x1b[46m
_IWHITE		=	\x1b[47m
_MAGENTA	=	\x1b[35m

#
##	MISC
#

NAME		= aben-azz.filler

MSG			=	$(_BOLD)$(_BLUE)Compiling filler$(_END)

CC			= gcc
C_FLAGS		= -Wall -Wextra -Werror
SRC_PATH	= src/
OBJ_PATH	= .obj/
LFT_PATH	= ./libft/
LFT_NAME	= libft.a
INC_PATH	= includes/
INC_FPATH	= includes/filler.h
INC			= -Iincludes -I$(LFT_PATH)includes

LONGEST		:=	$(shell echo $(notdir $(SRC)) | tr " " "\n" | awk ' { if (\
			length > x ) { x = length; y = $$0 } }END{ print y }' | wc -c)

#
##	SRCS & OBJS
#

_PROMPT 	= main.c
PROMPT 		= $(addprefix $(SRC_PATH)filler/,$(_PROMPT))
_PROMPT_O 	:= $(_PROMPT:.c=.o)
PROMPT_O 	:= $(PROMPT:.c=.o)


SRC			:= $(PROMPT)
_OBJ		:= $(_PROMPT_O)
OBJ_		:= $(PROMPT_O)
OBJ			:= $(addprefix $(OBJ_PATH), $(_OBJ))

#
##	RULES
#

all: $(LFT_PATH)$(LFT_NAME) $(NAME)

$(LFT_PATH)$(LFT_NAME):
	@$(MAKE) -C $(LFT_PATH);

$(NAME): $(OBJ)
	@$(CC) -o $(NAME) -L $(LFT_PATH) -lft $^ -o $@
	@printf "\r\033[K$(_BOLD)$(_RED)./$(NAME) is ready for use\n$(_END)"


$(OBJ_PATH)%.o: $(SRC_PATH)filler/%.c $(INC_FPATH)
	@printf "\r\033[K$(MSG) $(_BOLD)$(_CYAN)%-$(LONGEST)s\$(_END)" $(notdir $<)
	@mkdir -p $(OBJ_PATH)
	@$(CC) $(C_FLAGS) $(INC) -o $@ -c $<

clean: clean_obj
		@make clean -C $(LFT_PATH)

clean_obj:
		@rm -rf $(OBJ_PATH)
		@echo "$(_BOLD)$(_RED)Successfully removed all objects from filler\
		$(_END)"

fclean: clean_obj
		@make fclean -C $(LFT_PATH)
		@rm -f $(NAME) .21sh_alias
		@echo "$(_BOLD)$(_RED)Successfully removed ${NAME} from filler\
		$(_END)"

re: fclean all

.PHONY: all, $(NAME), clean, fclean, re, clean_obj
