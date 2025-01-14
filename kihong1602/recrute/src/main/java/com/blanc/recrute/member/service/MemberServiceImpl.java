package com.blanc.recrute.member.service;

import com.blanc.recrute.member.dao.MemberDAO;
import com.blanc.recrute.member.dao.MemberDAOImpl;
import com.blanc.recrute.member.dto.LoginDTO;
import com.blanc.recrute.member.dto.MemberDTO;

public class MemberServiceImpl implements MemberService {

    MemberDAO memberDAO = new MemberDAOImpl();

    @Override
    public int insertMember(MemberDTO memberDTO) {
        int result = 0;
        if (memberDTO != null) {
            result = memberDAO.insertMember(memberDTO);
        }


        return result;
    }

    @Override
    public String idCheck(String id) {

        if (id == null || id.isEmpty()) {
            return "blank";
        }

        return memberDAO.idCheck(id) <= 0 ? "none" : "exist";
    }

    @Override
    public boolean loginCheck(LoginDTO loginDTO) {

        MemberDTO memberDTO = new MemberDTO.Builder().memberId(loginDTO.getMemberId()).password(loginDTO.getPassword()).build();
        String memberId = memberDAO.loginCheck(memberDTO);

        return memberId != null;

    }
}
